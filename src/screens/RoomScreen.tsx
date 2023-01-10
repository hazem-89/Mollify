// import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  // Image,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import RoomUI from '../components/RoomUI';
import { useDatabaseContext } from '../util/context/DBContext';
import { rooms } from '../util/itemObjects';

export default function RoomScreen() {
  // const dimensions = useDimensions();
  // const [smallScreen] = useState(dimensions.screen.height < 600);
  const [profileRoom, setProfileRoom] = useState<ImageSourcePropType>();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const { loggedInProfile } = useDatabaseContext();

  const styles = StyleSheet.create({
    Background: {
      position: 'relative',
      overflowX: 'scroll',
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

  useEffect(() => {
    if (loggedInProfile) {
      // Get the room id from the profile loggedInProfile, sort through the roomObject and render the image with matching id.
      console.log(loggedInProfile.room);
      const roomObject = rooms.find(room => room.id === loggedInProfile.room);
      console.log(roomObject);
      setProfileRoom(roomObject?.image);
    }
  }, [loggedInProfile]);

  return (
    <>
      {/* {currentUser && ( */}
      <>
        <ImageBackground source={profileRoom} style={styles.Background} />
        <SafeAreaView style={styles.SafeArea}>
          <RoomUI />
        </SafeAreaView>
      </>
      {/* )} */}
    </>
  );
}
