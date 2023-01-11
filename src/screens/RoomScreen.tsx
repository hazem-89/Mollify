import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Draggable from '../components/Draggable';
import RoomUI from '../components/RoomUI';
import { useDatabaseContext } from '../util/context/DBContext';
import { rooms } from '../util/itemObjects';

export default function RoomScreen() {
  const [profileRoom, setProfileRoom] = useState<ImageSourcePropType>();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [aspectRatio, setAspectRatio] = useState<number>(ScreenWidth);
  const { loggedInProfile } = useDatabaseContext();

  const styles = StyleSheet.create({
    Background: {
      // use aspectRatio to make the image fit the height like perfect while creating horizontal scroll
      height: ScreenHeight,
      width: ScreenHeight * aspectRatio,
      minWidth: ScreenWidth,
    },
    SafeArea: {
      position: 'absolute',
      zIndex: 2,
      width: ScreenWidth,
    },
  });

  useEffect(() => {
    if (loggedInProfile) {
      // Get the room id from the profile loggedInProfile, sort through the roomObject and render the image with matching id.
      console.log(loggedInProfile.room);
      const foundRoom = rooms.find(room => room.id === loggedInProfile.room);
      if (foundRoom?.image) {
        setProfileRoom(foundRoom.image);
        // Calculate aspect ratio
        setAspectRatio(foundRoom.width / foundRoom.height);
      }
    }
  }, [loggedInProfile]);

  return (
    <>
      {/* Use safeAreaView to keep RoomUI away from notches and cameras on phones. */}
      <SafeAreaView style={styles.SafeArea}>
        <RoomUI />
      </SafeAreaView>
      <ScrollView horizontal={true}>
        <ImageBackground
          resizeMode="cover"
          source={profileRoom}
          style={styles.Background}
        />
        <Draggable />
      </ScrollView>
    </>
  );
}
