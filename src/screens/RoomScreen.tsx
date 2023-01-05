import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import {
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

  const styles = StyleSheet.create({
    WelcomeSign: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: smallScreen ? 350 : 450,
      height: smallScreen ? 100 : 140,
      top: 10,
      marginBottom: 10,
      zIndex: 5,
    },
    Background: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    tiger: {
      position: 'absolute',
      bottom: 0,
      left: smallScreen ? '15%' : '18%',
      flex: 1,
      height: 180,
      width: 130,
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
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
