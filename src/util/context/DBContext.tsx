import {
  collection,
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
  retrieveProfiles: Function;
  loggedInProfile: DocumentData | undefined;
  setLoggedInProfile: Function;
  storeAsyncData: Function;
}

export const DatabaseContext = createContext<ContextInterface>({
  profiles: [],
  setProfiles: () => false,
  loggedInProfile: [],
  setLoggedInProfile: () => false,
  retrieveProfiles: () => false,
  storeAsyncData: () => false,
});

export default function DatabaseProvider(props: any) {
  const { currentUser } = useLogin();
  // Here the profiles are stored each time the currentUser state changes.
  // TODO: Also needs to be updated when adding profiles.
  const [profiles, setProfiles] = useState<DocumentData[]>([]);
  const [loggedInProfile, setLoggedInProfile] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    // retrieve the asyncstorage
    if (currentUser?.uid) {
      // currentUser exists
      retrieveProfiles();
      getAsyncData('loggedInProfile');
    } else {
      // currentUser doesn't exist
      setLoggedInProfile(undefined);
      storeAsyncData('loggedInProfile', []);
      // @ts-ignore
      navigation.navigate('StartScreen');
    }
    // Disable esling for deps cause it works as intended.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (loggedInProfile) {
      console.log(loggedInProfile);
    }
    // Disable esling for deps cause it works as intended.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInProfile]);

  async function storeAsyncData(key: string, data: any[]) {
    // This function is used to store an object value in the async storage on the device
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  async function getAsyncData(key: string) {
    if (key === 'loggedInProfile') {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue != null) setLoggedInProfile(JSON.parse(jsonValue));
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function retrieveProfiles() {
    const profilesRef = collection(db, 'profiles');
    const searchQuery = query(
      profilesRef,
      where('mainUserId', '==', `${currentUser?.uid}`),
    );

    const querySnapshot = await getDocs(searchQuery);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map(doc => doc.data());
      setProfiles(data);
    }
  }

  return (
    <DatabaseContext.Provider
      value={{
        profiles,
        loggedInProfile,
        setLoggedInProfile,
        retrieveProfiles,
        storeAsyncData,
      }}
      {...props}
    />
  );
}

export const useDatabaseContext = () => useContext(DatabaseContext);
