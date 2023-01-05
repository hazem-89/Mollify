import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StartScreen } from '../screens/StartScreen';

export type MainStackParams = {
  StartScreen: {};
  RoomScreen: {};
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
