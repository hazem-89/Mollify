import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import { roomObjects, roomObjectsInterface } from '../../util/itemObjects';

type DisposalProps = {
  imageFilter: string;
  show: boolean;
};

export default function Disposal({ imageFilter, show }: DisposalProps) {
  const translateX = new Animated.Value(1000); // Initial value for translateX
  const ScreenHeight = Dimensions.get('window').height;
  const ScreenWidth = Dimensions.get('window').width;
  const [foundRoomObject, setFoundRoomObject] =
    useState<roomObjectsInterface>();

  const styles = StyleSheet.create({
    modal: {
      display: foundRoomObject && show ? 'flex' : 'none',
      height: ScreenHeight,
      flex: 1,
      justifyContent: 'flex-end',
      position: 'absolute',
      right: 0,
      zIndex: 0,
    },
    image: {
      width: ScreenWidth * 0.3,
      height: '80%',
    },
  });

  useEffect(() => {
    if (show && foundRoomObject) {
      // Animate slide in.
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate slide out not working but removing this breaks things.
      Animated.timing(translateX, {
        toValue: 1000,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [show, foundRoomObject]);

  useEffect(() => {
    // Should use an image id from db instead but addTodoForm is too confusing.
    switch (imageFilter) {
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
  }, [imageFilter]);

  function findRoomObject(objectID: string) {
    const roomObject = roomObjects.find(object => object.id === objectID);
    console.log(roomObject);
    if (roomObject) return roomObject;
    return undefined;
  }

  return (
    <>
      <View style={styles.modal}>
        <Animated.View style={[{ transform: [{ translateX }] }]}>
          {foundRoomObject && (
            <Image
              style={styles.image}
              resizeMode="contain"
              source={foundRoomObject.disposalImg}
            />
          )}
        </Animated.View>
      </View>
    </>
  );
}
