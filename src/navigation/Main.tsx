import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RoomScreen from '../screens/RoomScreen';
import StartScreen from '../screens/StartScreen';

// Define the parameters that can be passed to each screen in the stack
export type MainStackParams = {
  StartScreen: any;
  RoomScreen: any;
};

// Create a stack navigator using the MainStackParams type
const MainStack = createStackNavigator<MainStackParams>();

// Export a component that renders the MainStack.Navigator component
export const Main = () => (
  // Render the MainStack.Navigator component with the screenOptions prop set to hide the header
  <MainStack.Navigator
    initialRouteName="StartScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* Render the StartScreen screen as the initial screen in the stack */}
    <MainStack.Screen name="StartScreen" component={StartScreen} />
    <MainStack.Screen name="RoomScreen" component={RoomScreen} />
  </MainStack.Navigator>
);
