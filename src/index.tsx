import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { Main } from './navigation/Main';
import { StartPage } from './screens/StartPage';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        {/* <Main /> */}
        <StartPage />
      </NavigationContainer>
    </>
  );
}
