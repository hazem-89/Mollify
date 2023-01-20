import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyCTo7hSuh5MOri-AtOc8Vjc-1pmaCGB3mM',
  authDomain: 'mess-master-7ed7d.firebaseapp.com',
  projectId: 'mess-master-7ed7d',
  storageBucket: 'mess-master-7ed7d.appspot.com',
  messagingSenderId: '969530073454',
  appId: '1:969530073454:web:3d6d24d79da0b99d9be17f',
  measurementId: 'G-6G2Q1YWWT1',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
