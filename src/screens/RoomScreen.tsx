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
import { ProfileInterface, Tasks } from '../Interfaces';
import { useDataContext } from '../util/context/DataContext';
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
  const {
    loggedInProfile,
    retrieveFSData,
    setTasks,
    tasks,
    updateFSDoc,
    selectedChild,
    rewards,
    setRewards,
  } = useDataContext();

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
    if (
      loggedInProfile &&
      loggedInProfile.parent &&
      selectedChild !== undefined
    ) {
      // Logged in profile is a parent, find and render selected child's room
      handleData(selectedChild as ProfileInterface);
    } else if (loggedInProfile && loggedInProfile.room) {
      // Logged in profile is a kid, find and render kid's room.
      handleData(loggedInProfile as ProfileInterface);
    }
  }, [loggedInProfile, selectedChild]);

  function handleData(profileProp: ProfileInterface) {
    // find and render child's room
    const foundRoom = rooms.find(room => room.id === profileProp.room);
    if (foundRoom && foundRoom.image) {
      setProfileRoom(foundRoom.image);
      // Calculate aspect ratio
      setAspectRatio(foundRoom.width / foundRoom.height);
      // Get the tasks for rendering draggables
      console.log(profileProp.id);
      retrieveFSData('Tasks', 'profileId', `${profileProp.id}`).then(
        (data: any) => {
          if (data) setTasks(data);
        },
      );
      retrieveFSData('Rewards', 'profileId', `${profileProp.id}`).then(
        (data: any) => {
          if (data) setRewards(data);
        },
      );
    }
  }

  function handleMove(
    moving: boolean,
    task: Tasks,
    draggableCoords?: coordinates,
  ) {
    if (moving) {
      // When moving the Disposal component is rendered.
      setIsDragging(true);
    } else {
      if (
        draggableCoords &&
        viewPortCoords &&
        draggableCoords.x >= viewPortCoords.x + ScreenWidth * 0.7
      ) {
        // If draggableCoords overlap with the Disposal component the draggable should be marked as done and removed.
        updateFSDoc('Tasks', task.id, { hasRequest: true });
        retrieveFSData(
          'Tasks',
          'profileId',
          `${loggedInProfile?.mainUserId}`,
        ).then((data: any) => {
          if (data) setTasks(data);
        });
        setIsDragging(false);
      } else {
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
        {tasks &&
          loggedInProfile &&
          !loggedInProfile.parent &&
          tasks.map((task: Tasks) =>
            task.hasRequest === false ? (
              <Draggable
                key={task.id}
                task={task}
                onMove={(moving: boolean, draggableCoords?: coordinates) =>
                  handleMove(moving, task, draggableCoords)
                }
              />
            ) : null,
          )}
      </ScrollView>
      {isDragging && <Disposal show={isDragging} />}
    </View>
  );
}

