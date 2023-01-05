import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PaperForm from '../../../assets/Images/paperFormTEMP.png';
import Button from '../buttons/Buttons';
import SelectFormMenu from '../../../assets/Images/SelectFormMenu.png';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onEmit: Function;
  component: ReactElement | undefined;
};

export default function FormModal({ component, onEmit, text }: ModalProps) {
  const [componentState, setComponentState] = useState<ReactElement>();
  const translateX = new Animated.Value(1000); // Initial value for translateX
  const [todoForm, setTodoForm] = useState(false);
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);

  useEffect(() => {
    if (componentState !== component) {
      setComponentState(component);
      if (text === 'addTask') {
        setTodoForm(true);
      } else {
        setTodoForm(false);
      }
    }
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
      zIndex: 10,
      alignSelf: 'center',
    },
    scrollView: {
      padding: smallScreen ? 30 : 50,
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
      right: smallScreen ? 15 : 30,
      top: smallScreen ? 55 : 90,
    },
  });

  function handleClose() {
    setComponentState(undefined);
    if (onEmit) onEmit();
  }

  return (
    <>
      {componentState && (
        <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
          <ImageBackground
            style={todoForm ? null : styles.formBackground}
            resizeMode="stretch"
            source={todoForm ? SelectFormMenu : PaperForm}
          >
            <>
              <ScrollView style={styles.scrollView} horizontal={false}>
                {componentState &&
                  React.cloneElement(componentState, {
                    onClose: () => handleClose(),
                  })}
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  right: smallScreen ? 10 : 20,
                  top: smallScreen ? 40 : 50,
                }}
              >
                <Button background="Close" onPress={() => handleClose()} />
              </View>
            </>
          </ImageBackground>
        </Animated.View>
      )}
    </>
  );
}
