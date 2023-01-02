import { useDimensions } from '@react-native-community/hooks';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import SelectFormMenu from '../../../assets/Images/SelectFormMenu.png';
import Button from '../buttons/Buttons';
import { CreateProfileForm } from '../forms/CreateProfile';
import { LoginForm } from '../forms/Login';
import { SignUpForm } from '../forms/Signup';
import { AddCleaningToDo } from '../ToDos/AddCleaningToDo';
import { AddSpacialTodo } from '../ToDos/AddSpacialTodo';
import { AddToDo } from '../ToDos/AddToDo';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onEmit: Function;
  formName: string | undefined;
};

export default function TodoFormModal({ text, formName, onEmit }: ModalProps) {
  const [formNameState, setFormNameState] = useState<string | undefined>();
  const translateX = new Animated.Value(1000); // Initial value for translateX
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  useEffect(() => {
    if (formNameState !== formName) setFormNameState(formName);
  }, [formName]);

  useEffect(() => {
    if (formNameState) {
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
  }, [formNameState]);

  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      alignSelf: 'center',
      top: smallScreen ? -45 : -50,
      flex: 1,
      zIndex: 10,
    },
  });

  return (
    <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
      <ImageBackground source={SelectFormMenu}>
        {formNameState && (
          <View
            style={{
              position: 'absolute',
              right: smallScreen ? 45 : 60,
              top: smallScreen ? 60 : 80,
            }}
          >
            <Button
              background="Close"
              onPress={() => {
                setFormNameState(undefined);
                onEmit(undefined);
              }}
            />
          </View>
        )}
        {formNameState === 'AddCleaningTask' && <AddCleaningToDo />}
        {formNameState === 'AddSpacialTask' && <AddSpacialTodo />}
      </ImageBackground>
    </Animated.View>
  );
}
