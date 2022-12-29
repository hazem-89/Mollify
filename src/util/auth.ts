import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
  User,
  UserInfo,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
  const [currentUser, setCurrentUser] = useState<User>();
  const addUserToDb = (email: string, id: string) => {
    setDoc(doc(db, 'users', id), {
      email: email,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user as User);
    });
    return unsubscribe;
  }, [onAuthStateChanged, auth]);

  const submit = (functionName: string) => {
    const nextErrors: ErrorType = {};
    if (email.length === 0) {
      nextErrors.email = 'This field is required.';
    }
    if (password.length === 0) {
      nextErrors.password = 'This field is required.';
    }
    if (password.length < 6) {
      nextErrors.password = 'Password should be at least 6 characters.';
    }
    if (password !== confirmedPassword) {
      nextErrors.confirmedPassword = 'Passwords do not match';
    }
    setErrors(nextErrors);
    // console.log('====================================');
    // console.log(functionName);
    // console.log('====================================');
    const loginFun = async () => {
      try {
        login(email, password);
      } catch (error) {
        console.error('login failed' + error);
      }
    };
    if (Object.keys(nextErrors).length === 0 && functionName === 'login') {
      loginFun();
    } else if (
      Object.keys(nextErrors).length === 0 &&
      functionName === 'signUp'
    ) {
      signup(email, password);
    }

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    Alert.alert('Success!', `Email: ${email} \n Password: ${password}`);
    return null;
  };

  const signup = (email: string, password: string) => {
    console.log('signupStart');
    const nextErrors: ErrorType = {};
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
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const login = async (email: string, password: string) => {
    console.log('====================================');
    console.log('loginStart');
    console.log('====================================');
    try {
      await signInWithEmailAndPassword(auth, email, password).catch(error => {
        setErrorMessage(true);
      });

      if (auth.currentUser && !errorMessage) {
        setCurrentUser(auth.currentUser);
        console.log('====================================');
        console.log('currentUser', currentUser);
        console.log('====================================');
      } else {
        setCurrentUser(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser(undefined);
      })
      .catch(error => {
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
