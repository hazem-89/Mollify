import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Disposal from '../components/room/Disposal';
import Draggable from '../components/room/Draggable';
import RoomUI from '../components/RoomUI';
import { useDatabaseContext } from '../util/context/DBContext';
import { rooms } from '../util/itemObjects';

export interface coordinates {
  x: number;
  y: number;
}

export default function RoomScreen() {
  const [profileRoom, setProfileRoom] = useState<ImageSourcePropType>();
  const [isDragging, setIsDragging] = useState(false);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [aspectRatio, setAspectRatio] = useState<number>(ScreenWidth);
  // viewPortCoords refer to the top-left corner of the viewport.
  const [viewPortCoords, setViewPortCoords] = useState<coordinates>({
    x: 0,
    y: 0,
  });
  const { loggedInProfile } = useDatabaseContext();

  const styles = StyleSheet.create({
    BackgroundImage: {
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

  function handleMove(moving: boolean, draggableCoords?: coordinates) {
    if (moving) {
      // When moving the Disposal component is rendered.
      setIsDragging(true);
      console.log(viewPortCoords);
    } else {
      console.log(draggableCoords);
      if (
        draggableCoords &&
        viewPortCoords &&
        draggableCoords.x >= viewPortCoords.x + ScreenWidth * 0.7
      ) {
        // If draggableCoords overlap with the Disposal component the draggable should be marked as done and removed.
        console.log(
          'not moving and supposedly inside the right third of the screen',
        );
        setIsDragging(false);
      } else {
        console.log('not moving');
        // If end draggableCoords don't overlap then just remove Disposal component.
        setIsDragging(false);
      }
    }
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { x, y } = event.nativeEvent.contentOffset;
    setViewPortCoords({ x, y });
  }

  return (
    <View style={{ backgroundColor: 'black', display: 'flex' }}>
      {/* Use safeAreaView to keep RoomUI away from notches and cameras on phones. */}
      <SafeAreaView style={styles.SafeArea}>
        <RoomUI />
      </SafeAreaView>
      <ScrollView
        onScroll={e => handleScroll(e)}
        scrollEventThrottle={16}
        horizontal={true}
      >
        <ImageBackground
          resizeMode="cover"
          source={profileRoom}
          style={styles.BackgroundImage}
        />
        {/* For each task render a draggable with .map */}
        <Draggable
          onMove={(moving: boolean, draggableCoords?: coordinates) =>
            handleMove(moving, draggableCoords)
          }
        />
      </ScrollView>
      {isDragging && <Disposal show={isDragging} />}
    </View>
  );
}
