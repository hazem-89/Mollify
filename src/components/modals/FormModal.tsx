import { useDimensions } from '@react-native-community/hooks';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PaperForm from '../../../assets/Images/paperFormTEMP.png';
import Button from '../buttons/Buttons';
import { CreateProfileForm } from '../forms/CreateProfile';
import { LoginForm } from '../forms/Login';
import { SignUpForm } from '../forms/Signup';

type ModalProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  text?: string;
  onEmit: Function;
  formName: string | undefined;
};

export default function FormModal({ text, formName, onEmit }: ModalProps) {
  const [formNameState, setformNameState] = useState<string | undefined>();
  const translateX = new Animated.Value(1000); // Initial value for translateX
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  useEffect(() => {
    if (formNameState !== formName) setformNameState(formName);
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
      // Animate slide out not working but removing this breaks things.
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
      top: 0,
      zIndex: 10,
    },
    scrollView: {
      padding: 50,
      width: "contentWidth",
      height: "contentHeight",
      maxHeight: dimensions.window.height,
    },
    formBackground: {
      paddingTop: 35,
      paddingBottom: 35,
      minHeight: "contentHeight",
      maxHeight: dimensions.window.height,
      maxWidth: 0.75 * dimensions.window.width
    },
    btnPosition: {
      position: 'absolute',
      right: smallScreen ? 10 : 15,
      top: 20,
    },
  });

  return (
    <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
      <ImageBackground style={styles.formBackground} resizeMode="stretch" source={PaperForm}>
        <ScrollView style={styles.scrollView} horizontal={false}>
          {formNameState === 'SignUp' && <SignUpForm />}
          {formNameState === 'Login' && <LoginForm />}
          {formNameState === 'CreateProfileForm' && <CreateProfileForm />}
          {formNameState === 'ProfilePin' && <CreateProfileForm />}
          {formNameState && (
            <View style={styles.btnPosition}>
              < Button
                background="Close"
                onPress={() => {
                  setformNameState(undefined);
                  onEmit(undefined);
                }}
              />
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </Animated.View >
  );
}
