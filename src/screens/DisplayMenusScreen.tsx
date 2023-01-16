import React, { ReactElement, useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import DisplayTasksBackGround from '../../assets/images/DisplayTasksBackGround.png';
import Scoreboard from '../components/Scoreboard/Scoreboard';
import { DisplayTasksCategories } from '../components/ToDos/DisplayTasksCategories';

const DisplayMenusScreen = ({ route }: any) => {
  const [component, setComponent] = useState<ReactElement>();

  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const content = route.params.paramKey.content;

  useEffect(() => {
    const test = () => {
      content === 'DisplayTasks' && setComponent(<DisplayTasksCategories />);
      content === 'DisplayRewards' && setComponent(<Scoreboard />);
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
