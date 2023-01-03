import { useDimensions } from '@react-native-community/hooks';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import SelectFormMenu from '../../../assets/Images/SelectFormMenu.png';
import Button from '../buttons/Buttons';
import { AddActivityTask } from '../ToDos/AddActivityTask';
import { AddCleaningToDo } from '../ToDos/AddCleaningToDo';
import { AddSchoolTask } from '../ToDos/AddSchoolTask';
import { AddSpacialTodo } from '../ToDos/AddSpacialTodo';
import { AddToDo } from '../ToDos/AddToDo';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onTaskEmit: Function;
  addTaskFormName: string | undefined;
};

export default function TodoFormModal({
  addTaskFormName,
  onTaskEmit,
}: ModalProps) {
  const [addTaskFormNameState, setAddTaskFFormNameState] = useState<
    string | undefined
  >();
  const translateX = new Animated.Value(1000); // Initial value for translateX
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  useEffect(() => {
    if (addTaskFormNameState !== addTaskFormName)
      setAddTaskFFormNameState(addTaskFormName);
  }, [addTaskFormName]);

  useEffect(() => {
    if (addTaskFormNameState) {
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
  }, [addTaskFormNameState]);

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

  return (
    <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
      <ImageBackground
        source={SelectFormMenu}
        resizeMode="stretch"
        style={styles.formBackground}
      >
        {addTaskFormNameState && (
          <View
            style={{
              position: 'absolute',
              right: smallScreen ? 45 : 60,
              top: smallScreen ? 70 : 90,
            }}
          >
            <Button
              background="Close"
              onPress={() => {
                setAddTaskFFormNameState(undefined);
                onTaskEmit(undefined);
              }}
            />
          </View>
        )}
        {addTaskFormNameState === 'AddTodo' && <AddToDo />}
        {addTaskFormNameState === 'AddCleaningTask' && <AddCleaningToDo />}
        {addTaskFormNameState === 'AddSpacialTask' && <AddSpacialTodo />}
        {addTaskFormNameState === 'AddSchoolAssignment' && <AddSchoolTask />}
        {addTaskFormNameState === 'AddActivityTask' && <AddActivityTask />}
      </ImageBackground>
    </Animated.View>
  );
}
