import { useDimensions } from '@react-native-community/hooks';
import React from 'react';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PaperForm from '../../../assets/Images/paperFormTEMP.png';
import Button from '../buttons/Buttons';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onEmit: Function;
  component: JSX.Element | undefined;
};

export default function FormModal({ text, onEmit, component }: ModalProps) {
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
      // Animate slide out not working but removing this breaks things.
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
      // top: formNameState === 'AddTodo' ? 25 : 0,
      zIndex: 10,
      alignSelf: 'center',
    },
    scrollView: {
      padding: 50,
      width: '100%',
      height: '100%',
      maxHeight: dimensions.window.height,
    },
    formBackground: {
      paddingTop: 35,
      paddingBottom: 35,
      maxHeight: dimensions.window.height,
      maxWidth: 0.75 * dimensions.window.width,
    },
    btnPosition: {
      position: 'absolute',
      right: 30,
      top: 30,
    },
  });

  function handleClose() {
    setComponentState(undefined);
    onEmit();
  }

  return (
    <>
      {componentState && (
        <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
          <ImageBackground
            style={styles.formBackground}
            resizeMode="stretch"
            source={PaperForm}
          >
            <ScrollView style={styles.scrollView} horizontal={false}>
              {componentState &&
                React.cloneElement(componentState, { onClose: handleClose })}
            </ScrollView>
            <View style={styles.btnPosition}>
              <Button background="Close" onPress={handleClose} />
            </View>
          </ImageBackground>
        </Animated.View>
      )}
    </>
  );
}
