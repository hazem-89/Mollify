import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
import { StartPage } from '../screens/StartPage';

export type MainStackParams = {
  StartPage: {
    signUpMenuOpen: boolean;
  };
  SignUP: {
    signUpMenuOpen: boolean;
  };
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="StartPage" component={StartPage} />
  </MainStack.Navigator>
);
