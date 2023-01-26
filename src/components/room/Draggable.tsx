import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  // Text,
  PanResponderInstance,
  Dimensions,
  Image,
} from 'react-native';
import { Tasks } from '../../Interfaces';
import { coordinates } from '../../screens/RoomScreen';
import { roomObjects, roomObjectsInterface } from '../../util/itemObjects';

type DraggableProps = {
  onMove: Function;
  task: Tasks;
};

export default function Draggable({ onMove, task }: DraggableProps) {
  // State to keep track of the current x and y offset of the component, the initial value is where the draggable will start
  const ScreenHeight = Dimensions.get('window').height;
  const ScreenWidth = Dimensions.get('window').width;
  const [foundRoomObject, setFoundRoomObject] =
    useState<roomObjectsInterface>();
  const [inactivePan, setInactivePan] = useState<coordinates>({
    // The initial coordinates for where to place the draggable
    x: Math.floor(Math.random() * (ScreenWidth * 0.9)),
    y: ScreenHeight * 0.4,
  });
  const [pan, setPan] = useState<coordinates>(inactivePan);
  // Use the useRef hook to create a persistent PanResponder object that handles the touch events
  const panResponderRef = useRef<PanResponderInstance | null>(null);

  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      // Function to determine whether the touch gesture should be handled by the component
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx !== 1 && gestureState.dy !== 1) {
          onMove(true);
        }
        return gestureState.dx !== 0 && gestureState.dy !== 0;
      },
      // Function to update the component's state with the current gesture information
      // Important: the gestureState.dx/dy always starts at 0 for each time you interact with the draggable.
      onPanResponderMove: (evt, gestureState) => {
        setPan({
          x: gestureState.dx + inactivePan.x,
          y: gestureState.dy + inactivePan.y,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        setInactivePan({
          x: inactivePan.x + gestureState.dx,
          y: inactivePan.y + gestureState.dy,
        });
      },
    });
    if (pan !== inactivePan) onMove(false, inactivePan);
  }, [inactivePan]);

  useEffect(() => {
    // Should use an image id from db instead but addTodoForm is too confusing.
    if (task.category === 'Room') {
      switch (task.taskDescription) {
        // set the image to the one from roombject
        case 'Deal with your laundry':
          setFoundRoomObject(findRoomObject('laundry'));
          break;
        case 'Deal with your dishes':
          setFoundRoomObject(findRoomObject('dishes'));
          break;
        case 'Take out your garbage':
          setFoundRoomObject(findRoomObject('garbage'));
          break;
        case 'Water the poor plants':
          setFoundRoomObject(findRoomObject('watering'));
          break;
        case 'Get those dust bunnies':
          setFoundRoomObject(findRoomObject('vacuum'));
          break;
        default:
          break;
      }
    }
  }, [task]);

  function findRoomObject(objectID: string) {
    const roomObject = roomObjects.find(object => object.id === objectID);
    if (roomObject) return roomObject;
    return undefined;
  }

  const styles = StyleSheet.create({
    // Use position absolute to allow the component to be positioned in any location
    draggable: {
      position: 'absolute',
      width: '20%',
      height: '60%',
      // zIndex: 10,
      // Use the transform property to update the position of the component based on the current x and y offset
      transform: [{ translateX: pan.x }, { translateY: pan.y }],
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      bottom: 0,
    },
  });

  return (
    <View style={styles.draggable} {...panResponderRef.current?.panHandlers}>
      {/* The content of the draggable component goes here */}
      {foundRoomObject && (
        <Image
          resizeMode="contain"
          style={styles.image}
          source={foundRoomObject.draggableImg}
        />
      )}
      {/* 
      Might use this when draggable is clicked to display info
      <Text>{task.taskDescription}</Text> */}
    </View>
  );
}
