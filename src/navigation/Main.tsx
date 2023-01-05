import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StartPage } from '../screens/StartPage';
import RoomUI from '../components/RoomUI';

export type MainStackParams = {
  StartPage: {
    signUpMenuOpen: boolean;
  };
  RoomUI: {};
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* <MainStack.Screen name="RoomUI" component={RoomUI} /> */}
    <MainStack.Screen name="StartPage" component={StartPage} />
  </MainStack.Navigator>
);
