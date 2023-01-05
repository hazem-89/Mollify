import { useDimensions } from '@react-native-community/hooks';
import React from 'react';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PaperForm from '../../../assets/Images/paperFormTEMP.png';
import Button from '../buttons/Buttons';
import { AddToDo } from '../ToDos/AddToDo';
import SelectFormMenu from '../../../assets/Images/SelectFormMenu.png';
import { AddActivityTask } from '../ToDos/AddActivityTask';
import { AddCleaningToDo } from '../ToDos/AddCleaningToDo';
import { AddSchoolTask } from '../ToDos/AddSchoolTask';
import { AddSpacialTodo } from '../ToDos/AddSpacialTodo';
import { TodoMenuHeader } from './TodoMenuSign';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onEmit: Function;
  component: JSX.Element | undefined;
};

export default function FormModal({ component, onEmit }: ModalProps) {
  const [componentState, setComponentState] = useState<JSX.Element>();
  const [headerText, setHeaderText] = useState('');
  const translateX = new Animated.Value(1000); // Initial value for translateX
  const [todoForm, setTodoForm] = useState(false);
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  // console.log('headerText', headerText);

  useEffect(() => {
    if (componentState !== component) setComponentState(component);
    if ((component = <AddToDo /> || <AddActivityTask />)) {
      setTodoForm(true);
    } else {
      setTodoForm(false);
    }
  }, [component]);
  console.log('====================================');
  console.log('component', component);
  console.log('====================================');
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
      // top: smallScreen ? 10 : 20,
      // flex: 1,
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
            style={todoForm ? null : styles.formBackground}
            resizeMode="stretch"
            source={todoForm ? SelectFormMenu : PaperForm}
          >
            {/* {todoForm && (
              <>
                <View
                  style={{
                    position: 'absolute',
                    top: smallScreen ? -20 : -20,
                    left: '23%',
                    zIndex: 100,
                  }}
                >
                  <TodoMenuHeader text={headerText} />
                </View>
              </>
            )} */}

            {todoForm && (
              <>
                {componentState &&
                  React.cloneElement(componentState, { onClose: handleClose })}
                {componentState && (
                  <View
                    style={{
                      position: 'absolute',
                      right: smallScreen ? 45 : 60,
                      top: smallScreen ? 80 : 100,
                    }}
                  >
                    <Button background="Close" onPress={handleClose} />
                  </View>
                )}
              </>
            )}
            {!todoForm && (
              <>
                <ScrollView style={styles.scrollView} horizontal={false}>
                  {componentState &&
                    React.cloneElement(componentState, {
                      onClose: handleClose,
                    })}
                </ScrollView>
                <View style={styles.btnPosition}>
                  <Button background="Close" onPress={handleClose} />
                </View>
              </>
            )}
          </ImageBackground>
        </Animated.View>
      )}
    </>
  );
}
