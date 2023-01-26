import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProfileInterface } from '../Interfaces';
import AboutScreen from '../screens/AboutScreen';
import DisplayMenusScreen from '../screens/DisplayMenusScreen';
import LoadingScreen from '../screens/LoadingScreen';
import RoomScreen from '../screens/RoomScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StartScreen from '../screens/StartScreen';

// Define the parameters that can be passed to each screen in the stack
export type MainStackParams = {
  LoadingScreen: any;
  StartScreen: any;
  RoomScreen: { selectedProfile: ProfileInterface };
  TasksCategoryPage: { category: string; content: string };
  SettingsScreen: any;
  AboutScreen: any;
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
      <MainStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <MainStack.Screen name="AboutScreen" component={AboutScreen} />
    </MainStack.Navigator>
  );
};

