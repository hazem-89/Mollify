import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PaperForm from '../../../assets/images/paperFormTEMP.png';
import SelectFormMenu from '../../../assets/images/SelectFormMenu-1.png';
import { Text } from '../Text';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onEmit?: Function;
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
      if (
        text === 'Tasks' ||
        'displayTasks' ||
        'Special tasks' ||
        'School assignments' ||
        'Activities'
      ) {
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
      // marginBottom: 20,
    },
    formBackground: {
      paddingTop: 35,
      paddingBottom: 35,
      maxHeight: dimensions.window.height,
      maxWidth: 0.75 * dimensions.window.width,
    },
    btnPosition: {
      position: 'absolute',
      right: smallScreen ? 10 : 20,
      top: smallScreen ? 30 : 50,
    },
    mainTitleView: {
      alignItems: 'center',
      minHeight: smallScreen ? 65 : 100,
      justifyContent: 'center',
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
            <View style={styles.mainTitleView}>
              <Text type="MenuTitle">{text}</Text>
            </View>
            <>
              <ScrollView style={styles.scrollView} horizontal={false}>
                {componentState &&
                  React.cloneElement(componentState, {
                    onClose: () => handleClose(),
                  })}
              </ScrollView>
            </>
          </ImageBackground>
        </Animated.View>
      )}
    </>
  );
}

