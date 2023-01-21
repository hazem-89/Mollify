import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import DisplayTasksBackGround from '../../assets/images/DisplayTasksBackGround.png';

export default function DisplayMenusScreen() {
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;

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
      <SafeAreaView style={styles.SafeArea}>
        <View>eeeeeee</View>
      </SafeAreaView>
    </>
  );
}
