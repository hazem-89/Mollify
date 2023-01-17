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

interface ContextInterface {
  isLoading: boolean;
  profiles: DocumentData;
  setProfiles: Function;
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
  /** This function is used to store an object value in the async storage on the device. */
  storeAsyncData: Function;
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
  isLoading: true,
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
  updateFSDoc: () => false,
  deleteDocFromFS: () => false,
});

export default function DataProvider(props: any) {
  // Here 👇 the profiles are stored each time the currentUser state changes.
  const [profiles, setProfiles] = useState<DocumentData[]>();
  // the currently logged in profile, we need a state for when the logged in profile is a parent inspecting a childs room.
  const [loggedInProfile, setLoggedInProfile] = useState();
  // Here 👇 the tasks for the selected profile are stored.
  const [tasks, setTasks] = useState<DocumentData[]>([]);
  // Here 👇 the rewards for the selected profile are stored.
  const [rewards, setRewards] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser } = useLogin();
  const navigation = useNavigation();

  useEffect(() => {
    // retrieve the asyncstorage
    if (currentUser !== undefined) {
      if (currentUser?.uid) {
        retrieveFSData('profiles', 'mainUserId', `${currentUser?.uid}`).then(
          data => {
            if (data) setProfiles(data);
            console.log(data);
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
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (loggedInProfile && !('parent' in loggedInProfile)) {
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
      console.error(e);
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
      console.error(e);
    }
  }

  /** Retrieve firestore data function.
   * Uses querying to retrieve documents where the prop value in the document = the value passed to the function.
   * For example usage see DBContext.
   */
  // eslint-disable-next-line consistent-return
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

  //  Update document in firestore
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

  /** Delete document from firestore */
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
        isLoading,
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
        updateFSDoc,
        deleteDocFromFS,
      }}
      {...props}
    />
  );
}

export const useDataContext = () => useContext(DataContext);
