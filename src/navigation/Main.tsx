import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StartPage } from '../screens/StartPage';
import Scoreboard from '../components/Scoreboard/Scoreboard';

export type MainStackParams = {
  StartPage: {
    signUpMenuOpen: boolean;
  };
  Scoreboard: {
    
  };
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* <MainStack.Screen name="StartPage" component={StartPage} /> */}
    <MainStack.Screen name="Scoreboard" component={Scoreboard} />
  </MainStack.Navigator>
);
