import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';

type ErrorType = {
  email?: string;
  password?: string;
  confirmedPassword?: string;
};

export const useLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const addUserToDb = (email: string, id: string) => {
    setDoc(doc(db, 'users', id), {
      email,
      id,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user as User);
    });
    return unsubscribe;
  }, [onAuthStateChanged, auth]);

  const nextErrors: ErrorType = {};

  const submit = (functionName: string) => {
    if (email.length === 0) {
      nextErrors.email = 'Please enter an email';
    } else if (email.indexOf('@') < 1) {
      nextErrors.email = 'Please enter a valid email';
    }
    if (password.length === 0) {
      nextErrors.password = 'Please enter a password';
    } else if (password.length < 6) {
      nextErrors.password = 'Password should be at least 6 characters.';
    }
    if (password !== confirmedPassword && functionName === 'signUp') {
      nextErrors.confirmedPassword = 'Passwords do not match';
    } else if (confirmedPassword.length === 0 && functionName === 'signUp') {
      nextErrors.confirmedPassword = 'You need to confirm your password';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0 && functionName === 'login') {
      login(email, password);
      Alert.alert('login Success!', `Email: ${email}`);
    } else if (
      Object.keys(nextErrors).length === 0 &&
      functionName === 'signUp'
    ) {
      signup(email, password);
      Alert.alert('Sign up Success!', `Email: ${email}`);
    }
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    return null;
  };

  const signup = (email: string, password: string) => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          if (auth.currentUser) {
            updateProfile(auth.currentUser, {});
          }
          if (auth.currentUser && auth.currentUser.email) {
            addUserToDb(auth.currentUser.email, auth.currentUser.uid);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).catch(error => {
        setErrorMessage(true);
        console.log(error);
      });
      if (auth.currentUser && !errorMessage) {
        setCurrentUser(auth.currentUser);
      } else {
        setCurrentUser(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    const auth = getAuth();
    signOut(auth).catch(error => {
      console.error(error);
    });
  };
  return {
    submit,
    errors,
    email,
    setEmail,
    password,
    setPassword,
    confirmedPassword,
    setConfirmedPassword,
    signup,
    login,
    currentUser,
    logout,
  };
};
