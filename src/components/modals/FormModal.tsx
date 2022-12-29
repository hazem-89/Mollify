import { useDimensions } from '@react-native-community/hooks';
import { useEffect, useState } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import PaperForm from '../../../assets/Images/paperFormTEMP.png';
import Button from '../buttons/Buttons';
import { CreateProfileForm } from '../forms/CreateProfile';
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
      top: '26%',
      flex: 1,
      zIndex: 10,
    },
  });

  return (
    <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
      <ImageBackground resizeMode="stretch" source={PaperForm}>
        <View
          style={{
            position: 'absolute',
            right: smallScreen ? 30 : 35,
            top: smallScreen ? 25 : 25,
          }}
        >
          <Button
            background="Close"
            onPress={() => {
              setformNameState(undefined);
              onEmit(undefined);
            }}
          />
        </View>
        {formNameState === 'SignUp' && <SignUpForm />}
        {formNameState === 'GoogleSignUp' && <CreateProfileForm />}
        {formNameState === 'Login' && <CreateProfileForm />}
      </ImageBackground>
    </Animated.View>
  );
}
