import { useDimensions } from '@react-native-community/hooks';
import React from 'react';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import SelectFormMenu from '../../../assets/Images/SelectFormMenu.png';
import Button from '../buttons/Buttons';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onTaskEmit: Function;
  component: JSX.Element | undefined;
};

export default function TodoFormModal({ component, onTaskEmit }: ModalProps) {
  const [componentState, setComponentState] = useState<JSX.Element>();

  const translateX = new Animated.Value(1000); // Initial value for translateX
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  useEffect(() => {
    if (componentState !== component) setComponentState(component);
  }, [component]);

  useEffect(() => {
    if (componentState) {
      // Animate slide in.
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate slide out.
      Animated.timing(translateX, {
        toValue: 1000,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [componentState]);

  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      alignSelf: 'center',
      top: smallScreen ? 10 : 20,
      flex: 1,
      zIndex: 10,
    },
    formBackground: {
      // paddingTop: 35,
      // paddingBottom: 35,
      // maxHeight: dimensions.window.height,
      // maxWidth: dimensions.window.width,
    },
  });

  function handleClose() {
    setComponentState(undefined);
    onTaskEmit();
  }
  return (
    <>
      {componentState && (
        <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
          <ImageBackground
            source={SelectFormMenu}
            resizeMode="stretch"
            style={styles.formBackground}
          >
            {componentState &&
              React.cloneElement(componentState, { onClose: handleClose })}
            {componentState && (
              <View
                style={{
                  position: 'absolute',
                  right: smallScreen ? 45 : 60,
                  top: smallScreen ? 70 : 90,
                }}
              >
                <Button background="Close" onPress={handleClose} />
              </View>
            )}
          </ImageBackground>
        </Animated.View>
      )}
    </>
  );
}
