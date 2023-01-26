import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../../firebaseConfig';
import { useLogin } from '../auth';
import { ProfileInterface } from '../../Interfaces';

interface ContextInterface {
  profiles: DocumentData;
  setProfiles: Function;
  filteredProfiles: DocumentData;
  tasks: DocumentData;
  setTasks: Function;
  rewards: DocumentData;
  setRewards: Function;
  /** Retrieve firestore data function.
   * Uses querying to retrieve documents where the prop value in the document = the value passed to the function.
   * For example usage see DBContext.
   */
  retrieveFSData: Function;
  loggedInProfile: DocumentData | undefined;
  setLoggedInProfile: Function;
  selectedChild: DocumentData;
  setSelectedChild: Function;
  /** This boolean object will be used to add or remove the user-guides */
  onboardingComplete: {
    roomScreenChild: boolean;
    roomScreenParent: boolean;
    taskScreenParent: boolean;
    rewardScreenParent: boolean;
    taskScreenChild: boolean;
    rewardScreenChild: boolean;
  };
  setOnboardingComplete: Function;
  /** This function is used to store or remove an object value in the async storage on the device.
   * The function takes in a key and a data{}, if you want to remove the key value leave the data prop undefined.
   */
  setAsyncData: Function;
  /** Add document to firestore.
   * Takes in collectionName and data{}.
   * No need to add id referencing the doc in the data object, it gets added in addDocToFS func.
   * */
  addDocToFS: Function;
  /** Update document in firestore.
   * Takes collectionName, document and data{}
   */
  updateFSDoc: Function;
  deleteDocFromFS: Function;
}

export const DataContext = createContext<ContextInterface>({
  profiles: [],
  setProfiles: () => false,
  filteredProfiles: [],
  tasks: [],
  setTasks: () => false,
  rewards: [],
  setRewards: () => false,
  loggedInProfile: [],
  setLoggedInProfile: () => false,
  selectedChild: [],
  setSelectedChild: () => false,
  onboardingComplete: {
    roomScreenChild: false,
    roomScreenParent: false,
    taskScreenParent: false,
    rewardScreenParent: false,
    taskScreenChild: false,
    rewardScreenChild: false,
  },
  setOnboardingComplete: () => false,
  retrieveFSData: () => false,
  setAsyncData: () => false,
  addDocToFS: () => false,
  updateFSDoc: () => false,
  deleteDocFromFS: () => false,
});

export default function DataProvider(props: any) {
  // Here 👇 all the profiles are stored each time the currentUser state changes.
  const [profiles, setProfiles] = useState<DocumentData[]>();
  // the currently logged in profile, can be parent or child.
  const [loggedInProfile, setLoggedInProfile] = useState<ProfileInterface>();
  // The current child profile being managed
  const [selectedChild, setSelectedChild] = useState<ProfileInterface>();
  // The filtered profiles that are rendered when logged in as parent.
  const [filteredProfiles, setFilteredProfiles] = useState<DocumentData>();
  // Here 👇 the tasks for the selected profile are stored.
  const [tasks, setTasks] = useState<DocumentData[]>([]);
  // Here 👇 the rewards for the selected profile are stored.
  const [rewards, setRewards] = useState<DocumentData[]>([]);
  // Here 👇 the completed guides are stored.
  const [onboardingComplete, setOnboardingComplete] = useState({
    roomScreenChild: false,
    roomScreenParent: false,
    taskScreenParent: false,
    rewardScreenParent: false,
    taskScreenChild: false,
    rewardScreenChild: false,
  });
  const { currentUser } = useLogin();
  const navigation = useNavigation();

  useEffect(() => {
    // Logged in, retrieve data
    if (currentUser !== undefined) {
      if (currentUser?.uid) {
        retrieveFSData('profiles', 'mainUserId', `${currentUser.uid}`).then(
          data => {
            if (data) setProfiles(data);
          },
        );
        getAsyncData('loggedInProfile').then(data => {
          if (data) setLoggedInProfile(data);
        });
        getAsyncData('onboardingComplete').then(data => {
          if (data) setOnboardingComplete(data);
        });
      } else {
        // Logging out, reset relevant states
        setLoggedInProfile(undefined);
        setFilteredProfiles(undefined);
        setProfiles(undefined);
        setSelectedChild(undefined);
        setTasks([]);
        setRewards([]);
        setAsyncData('loggedInProfile', undefined);
        // @ts-ignore
        navigation.navigate('StartScreen');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (loggedInProfile !== undefined) {
      if (!loggedInProfile.parent) {
        // Navigate to room if child profile
        // @ts-ignore
        navigation.navigate('RoomScreen');
      } else if (selectedChild) {
        // @ts-ignore
        navigation.navigate('RoomScreen');
      } else if (profiles) {
        // Stay on selectProfile and remove parent profile from selectable profiles if loggedInProfile is parent.
        const filter = profiles.filter(
          (profile: DocumentData) => profile.id !== loggedInProfile.id,
        );
        setFilteredProfiles(filter);
        // @ts-ignore
        navigation.navigate('StartScreen');
      } else {
        // @ts-ignore
        navigation.navigate('StartScreen');
      }
    } else {
      setAsyncData('loggedInProfile', undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInProfile, profiles, selectedChild]);

  // This function is used to store or remove an object value in the async storage on the device.
  async function setAsyncData(key: string, data: any[] | undefined) {
    console.log('running setasyncdata');
    try {
      if (data !== undefined) {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // This function is used to get an object value in the async storage on the device.
  async function getAsyncData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  // Retrieve firestore data function.
  async function retrieveFSData(
    collectionName: string,
    prop: string,
    value: string,
  ) {
    try {
      const ref = collection(db, collectionName);
      const searchQuery = query(ref, where(prop, '==', value));

      const querySnapshot = await getDocs(searchQuery);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map(document => document.data());
        return data;
      }
    } catch (err) {
      console.error(
        `No data found for ${collectionName} where ${prop} = ${value}: ${err}`,
      );
    }
    return null;
  }

  // Add document to firestore.
  async function addDocToFS(collectionName: string, data: {}) {
    try {
      const newDocRef = doc(collection(db, collectionName));
      await setDoc(newDocRef, { ...data, id: newDocRef.id });
    } catch (err) {
      console.error(err);
    }
  }

  // Update document in firestore
  async function updateFSDoc(
    collectionName: string,
    document: string,
    data: {},
  ) {
    try {
      const docRef = doc(db, collectionName, document);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error(`Error updating document: ${error}`);
    }
  }

  // Delete document from firestore
  async function deleteDocFromFS(collectionName: string, documentId: string) {
    try {
      await deleteDoc(doc(db, collectionName, documentId));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <DataContext.Provider
      value={{
        profiles,
        setProfiles,
        selectedChild,
        setSelectedChild,
        filteredProfiles,
        tasks,
        setTasks,
        rewards,
        setRewards,
        loggedInProfile,
        setLoggedInProfile,
        onboardingComplete,
        setOnboardingComplete,
        retrieveFSData,
        setAsyncData,
        addDocToFS,
        updateFSDoc,
        deleteDocFromFS,
      }}
      {...props}
    />
  );
}

export const useDataContext = () => useContext(DataContext);
