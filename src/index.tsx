import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './navigation/Main';
import TaskContextProvide from './util/Context/TaskContext';
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <TaskContextProvide>
          <Main />
        </TaskContextProvide>
      </NavigationContainer>
    </>
  );
}
