import { useDimensions } from '@react-native-community/hooks';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import PaperForm from '../../../assets/Images/paperFormTEMP.png';
import Button from '../buttons/Buttons';
import { CreateProfileForm } from '../forms/CreateProfile';
import { LoginForm } from '../forms/Login';
import { SignUpForm } from '../forms/Signup';
import { AddCleaningToDo } from '../ToDos/AddCleaningToDo';
import { AddToDo } from '../ToDos/AddToDo';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onEmit: Function;
  formName: string | undefined;
};

export default function FormModal({ text, formName, onEmit }: ModalProps) {
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
      justifyContent: 'center',
      top: smallScreen ? '15%' : '15%',
      flex: 1,
      zIndex: 10,
    },
  });

  return (
    <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
      <ImageBackground source={PaperForm}>
        {formNameState && (
          <View
            style={{
              position: 'absolute',
              right: smallScreen ? 10 : 15,
              top: smallScreen ? 35 : 42,
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
        {formNameState === 'SignUp' && <SignUpForm />}
        {formNameState === 'Login' && <LoginForm />}
        {formNameState === 'CreateProfileForm' && <CreateProfileForm />}
        {formNameState === 'ProfilePin' && <CreateProfileForm />}
        {formNameState === 'AddTodo' && <AddToDo />}
        {formNameState === 'AddCleaningTask' && <AddCleaningToDo />}
      </ImageBackground>
    </Animated.View>
  );
}
