import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DisplayMenusScreen from '../screens/DisplayMenusScreen';
import RoomScreen from '../screens/RoomScreen';
import StartScreen from '../screens/StartScreen';
// import { useLogin } from '../util/auth';
// import { useDataContext } from '../util/context/DBContext';

// Define the parameters that can be passed to each screen in the stack
export type MainStackParams = {
  StartScreen: any;
  RoomScreen: any;
  TasksCategoryPage: { category: string; content: string };
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => {
  // const { loggedInProfile } = useDataContext();
  // const { currentUser } = useLogin();

  return (
    <MainStack.Navigator
      initialRouteName={
        'StartScreen'
        // The idea was to use the stored loggedInProfile to always go to the profiles room but it's not working right, maybe we could use a splashscreen as a loading screen to do this.
        // state ? 'RoomScreen' : 'StartScreen'
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="StartScreen" component={StartScreen} />
      <MainStack.Screen name="RoomScreen" component={RoomScreen} />
      <MainStack.Screen
        name="TasksCategoryPage"
        component={DisplayMenusScreen}
      />
    </MainStack.Navigator>
  );
};
