import React, { ReactElement, useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import DisplayTasksBackGround from '../../assets/Images/DisplayTasksBackGround.png';
import { CreateProfileForm } from '../components/forms/CreateProfile';
import { DisplayTasksCategories } from '../components/ToDos/DisplayTasksCategories';
import { TasksComponent } from '../components/ToDos/TasksComponent';

const DisplayMenusScreen = ({ route }: any) => {
  const [component, setComponent] = useState<ReactElement>();

  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const content = route.params.paramKey.content;

  useEffect(() => {
    const test = () => {
      content === 'DisplayTasks' && setComponent(<DisplayTasksCategories />);
    };
    test();
  }, []);
  const styles = StyleSheet.create({
    Background: {
      position: 'relative',
      overflowX: 'scroll',
      height: ScreenHeight,
      width: ScreenWidth,
      flex: 1,
      resizeMode: 'stretch',
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      maxHeight: ScreenHeight,
      height: ScreenHeight,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    },
  });

  return (
    <>
      <Image source={DisplayTasksBackGround} style={styles.Background} />
      <SafeAreaView style={styles.SafeArea}>{component}</SafeAreaView>
    </>
  );
};

export default DisplayMenusScreen;
