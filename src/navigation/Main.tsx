import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProfileInterface } from '../Interfaces';
import DisplayMenusScreen from '../screens/DisplayMenusScreen';
import LoadingScreen from '../screens/LoadingScreen';
import RoomScreen from '../screens/RoomScreen';
import StartScreen from '../screens/StartScreen';

// Define the parameters that can be passed to each screen in the stack
export type MainStackParams = {
  LoadingScreen: any;
  StartScreen: any;
  RoomScreen: { selectedProfile: ProfileInterface };
  TasksCategoryPage: { category: string; content: string };
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => {
  return (
    <MainStack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="LoadingScreen" component={LoadingScreen} />
      <MainStack.Screen name="StartScreen" component={StartScreen} />
      <MainStack.Screen name="RoomScreen" component={RoomScreen} />
      <MainStack.Screen
        name="TasksCategoryPage"
        component={DisplayMenusScreen}
      />
    </MainStack.Navigator>
  );
};
