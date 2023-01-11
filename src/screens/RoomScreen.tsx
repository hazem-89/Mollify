// import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Draggable from '../components/Draggable';
import RoomUI from '../components/RoomUI';
import { useDatabaseContext } from '../util/context/DBContext';
import { rooms, roomInterface } from '../util/itemObjects';

export default function RoomScreen() {
  const [roomObject, setRoomObject] = useState<roomInterface>();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [aspectRatio, setAspectRatio] = useState<number>(ScreenWidth);
  const { loggedInProfile } = useDatabaseContext();

  const styles = StyleSheet.create({
    Background: {
      // position: 'relative',
      // overflowX: 'scroll',
      height: ScreenHeight,
      width: ScreenHeight * aspectRatio,
    },
    SafeArea: {
      position: 'absolute',
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      height: ScreenHeight,
      maxHeight: ScreenHeight,
    },
  });

  useEffect(() => {
    if (loggedInProfile) {
      // Get the room id from the profile loggedInProfile, sort through the roomObject and render the image with matching id.
      console.log(loggedInProfile.room);
      const foundRoom = rooms.find(room => room.id === loggedInProfile.room);
      if (foundRoom) {
        setRoomObject(foundRoom);
        setAspectRatio(foundRoom.width / foundRoom.height);
      }
    }
  }, [loggedInProfile]);

  return (
    <>
      <SafeAreaView style={styles.SafeArea}>
        <ScrollView horizontal={true}>
          <ImageBackground
            resizeMode="contain"
            source={roomObject?.image}
            style={styles.Background}
          />
          <Draggable />
        </ScrollView>
        <RoomUI />
      </SafeAreaView>
    </>
  );
}
