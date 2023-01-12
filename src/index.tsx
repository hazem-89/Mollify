import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './navigation/Main';
import TaskContextProvide from './util/context/TaskContext';
import DatabaseProvider from './util/context/DBContext';

export default function App() {
  // Render the app
  return (
    <>
      <StatusBar hidden style="auto" />
      {/* 
        Render the NavigationContainer component with the Main component as its child. 
        The NavigationContainer component is the root component for the navigation system,
        and it is responsible for managing the navigation state and linking the app to the 
        appropriate navigation logic. 
      */}
      <NavigationContainer>
        <DatabaseProvider>
          <TaskContextProvide>
            <Main />
          </TaskContextProvide>
        </DatabaseProvider>
      </NavigationContainer>
    </>
  );
}
