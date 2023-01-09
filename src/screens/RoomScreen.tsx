import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import {
  Dimensions,
  // Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import roomImage from '../../assets/Images/roomExample.png';
import RoomUI from '../components/RoomUI';

export default function RoomScreen() {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    Background: {
      position: 'relative',
      width: ScreenWidth,
      height: ScreenHeight,
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      height: ScreenHeight,
      maxHeight: ScreenHeight,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    },
  });

  return (
    <>
      {/* {currentUser && ( */}
      <>
        <ImageBackground source={roomImage} style={styles.Background} />
        <SafeAreaView style={styles.SafeArea}>
          <RoomUI />
        </SafeAreaView>
      </>
      {/* )} */}
    </>
  );
}
