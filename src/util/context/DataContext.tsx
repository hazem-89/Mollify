import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../../firebaseConfig';
import { useLogin } from '../auth';

interface ContextInterface {
  profiles: DocumentData;
  setProfiles: Function;
  tasks: DocumentData;
  setTasks: Function;
  rewards: DocumentData;
  setRewards: Function;
  retrieveFSData: Function;
  loggedInProfile: DocumentData | undefined;
  setLoggedInProfile: Function;
  storeAsyncData: Function;
  addDocToFS: Function;
  deleteDocFromFS: Function;
}

export const DataContext = createContext<ContextInterface>({
  profiles: [],
  setProfiles: () => false,
  tasks: [],
  setTasks: () => false,
  rewards: [],
  setRewards: () => false,
  loggedInProfile: [],
  setLoggedInProfile: () => false,
  retrieveFSData: () => false,
  storeAsyncData: () => false,
  addDocToFS: () => false,
  deleteDocFromFS: () => false,
});

export default function DataProvider(props: any) {
  // Here 👇 the profiles are stored each time the currentUser state changes.
  const [profiles, setProfiles] = useState<DocumentData[]>([]);
  // the currently logged in profile, we need a state for when the logged in profile is a parent inspecting a childs room.
  const [loggedInProfile, setLoggedInProfile] = useState();
  // Here 👇 the tasks for the selected profile are stored.
  const [tasks, setTasks] = useState<DocumentData[]>([]);
  // Here 👇 the rewards for the selected profile are stored.
  const [rewards, setRewards] = useState<DocumentData[]>([]);
  const { currentUser } = useLogin();
  const navigation = useNavigation();

  useEffect(() => {
    // retrieve the asyncstorage
    if (currentUser !== undefined) {
      if (currentUser?.uid) {
        retrieveFSData('profiles', 'mainUserId', `${currentUser?.uid}`).then(
          data => {
            if (data) setProfiles(data);
          },
        );
        getAsyncData('loggedInProfile');
      } else {
        setLoggedInProfile(undefined);
        storeAsyncData('loggedInProfile', []);
        // @ts-ignore
        navigation.navigate('StartScreen');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (loggedInProfile && 'room' in loggedInProfile) {
      console.log(loggedInProfile);
      // @ts-ignore
      navigation.navigate('RoomScreen');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInProfile]);

  /** This function is used to store an object value in the async storage on the device. */
  async function storeAsyncData(key: string, data: any[]) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  /** This function is used to get an object value in the async storage on the device. */
  async function getAsyncData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        setLoggedInProfile(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  }

  /** Retrieve firestore data function.
   * Uses querying to retrieve documents where the prop value in the document = the value passed to the function.
   * For example usage see DBContext.
   */
  async function retrieveFSData(
    collectionName: string,
    prop: string,
    value: string,
  ) {
    const ref = collection(db, collectionName);
    const searchQuery = query(ref, where(prop, '==', value));

    const querySnapshot = await getDocs(searchQuery);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map(document => document.data());
      return data;
    }
    // Handle empty querySnapshot
    throw new Error(
      `No data found for ${collectionName} where ${prop} = ${value}`,
    );
  }

  /** Add document to firestore */
  async function addDocToFS(collectionName: string, data: {}) {
    try {
      await addDoc(collection(db, collectionName), {
        ...data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  /** Delete document from firestore */
  async function deleteDocFromFS(collectionName: string, documentId: string) {
    try {
      await deleteDoc(doc(db, collectionName, documentId));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <DataContext.Provider
      value={{
        profiles,
        setProfiles,
        tasks,
        setTasks,
        rewards,
        setRewards,
        loggedInProfile,
        setLoggedInProfile,
        retrieveFSData,
        storeAsyncData,
        addDocToFS,
        deleteDocFromFS,
      }}
      {...props}
    />
  );
}

export const useDataContext = () => useContext(DataContext);
