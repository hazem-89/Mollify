import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import FormTemp from '../../../assets/Images/paperFormTEMP.png';
import { useLogin } from '../../util/auth';
import { TextInput } from '../forms/Form';
import Button from '../../components/buttons/Buttons';
import { Text } from '../Text';
import { useDimensions } from '@react-native-community/hooks';

type SignUpProps = {
  signUpMenuOpen: boolean;
  setSignUpMenuOpen: Function;
};
export const SignUp = ({ signUpMenuOpen, setSignUpMenuOpen }: SignUpProps) => {
  const {
    submit,
    errors,
    email,
    setEmail,
    password,
    setPassword,
    confirmedPassword,
    setConfirmedPassword,
  } = useLogin();
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const handleMenu = () => {
    signUpMenuOpen ? setSignUpMenuOpen(false) : null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: smallScreen ? 40 : 60,
      // width: 400,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    backGroundImage: {
      width: smallScreen ? 300 : 430,
      height: smallScreen ? 300 : 430,
      flex: 1,
      zIndex: 3,
      position: 'relative',
    },
  });
  return (
    <ImageBackground source={FormTemp} style={styles.backGroundImage}>
      <Button
        background="CancelButton"
        onPress={handleMenu}
        type="CancelButton"
      />
      <View style={styles.container}>
        <Text type="formText">Let’s register your account.</Text>
        <TextInput
          placeholder="Enter your email..."
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          errorText={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Choose your password..."
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry
          errorText={errors.password}
          autoCapitalize="none"
          value={password}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmedPassword}
          onChangeText={(text: string) => setConfirmedPassword(text)}
          secureTextEntry
          errorText={errors.confirmedPassword}
          autoCapitalize="none"
        />
        <Button
          background="GreenForms"
          text="Create account"
          onPress={submit}
          type="Green"
        />
      </View>
    </ImageBackground>
  );
};
