import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StartScreen } from "../screens/StartScreen";
import RoomUI from '../components/RoomUI';

export type MainStackParams = {
  StartScreen: {
  };
  RoomScreen: {
  };
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* <MainStack.Screen name="RoomUI" component={RoomUI} /> */}
    <MainStack.Screen name="StartScreen" component={StartScreen} />
  </MainStack.Navigator>
);
