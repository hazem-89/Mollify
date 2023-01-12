import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Text,
  PanResponderInstance,
  Dimensions,
} from 'react-native';
import { coordinates } from '../../screens/RoomScreen';

type DraggableProps = {
  onMove: Function;
};

export default function Draggable({ onMove }: DraggableProps) {
  // State to keep track of the current x and y offset of the component, the initial value is where the draggable will start
  const ScreenHeight = Dimensions.get('window').height;
  const ScreenWidth = Dimensions.get('window').width;
  const [inactivePan, setInactivePan] = useState<coordinates>({
    // The initial coordinates for where to place the draggable
    x: Math.floor(Math.random() * ScreenWidth),
    y: ScreenHeight - 50,
  });
  const [pan, setPan] = useState<coordinates>(inactivePan);

  // Use the useRef hook to create a persistent PanResponder object that handles the touch events
  const panResponderRef = useRef<PanResponderInstance | null>(null);

  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      // Function to determine whether the touch gesture should be handled by the component
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx !== 1 && gestureState.dy !== 1) onMove(true);
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
  }, [inactivePan]);

  useEffect(() => {
    onMove(false, inactivePan);
  }, [inactivePan]);

  const styles = StyleSheet.create({
    // Use position absolute to allow the component to be positioned in any location
    draggable: {
      position: 'absolute',
      zIndex: 10,
      // Use the transform property to update the position of the component based on the current x and y offset
      transform: [{ translateX: pan.x }, { translateY: pan.y }],
    },
  });

  return (
    <View style={styles.draggable} {...panResponderRef.current?.panHandlers}>
      {/* The content of the draggable component goes here */}
      <Text>Drag me</Text>
    </View>
  );
}
