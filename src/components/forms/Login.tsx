import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import FormTemp from '../../../assets/Images/paperFormTEMP.png';
import { useLogin } from '../../util/auth';
import { TextInput } from '../forms/Form';
import Button from '../../components/buttons/Buttons';
import { Text } from '../Text';
import { useDimensions } from '@react-native-community/hooks';

type LogInProps = {
  loginMenuOpen: boolean;
  setLoginMenuOpen: Function;
};
export const LoginForm = ({ loginMenuOpen, setLoginMenuOpen }: LogInProps) => {
  const { login, errors, submit } = useLogin();
  const dimensions = useDimensions();
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const handleMenu = () => {
    loginMenuOpen ? setLoginMenuOpen(false) : null;
  };

  const handleSignIn = async () => {
    submit();
    console.log(errors);

    try {
      if (Object.keys(errors).length === 0) {
        console.log('login');

        await login(loginEmail, loginPassword);
      }
    } catch (error) {
      console.error('login failed' + error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: smallScreen ? 40 : 60,
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
      <View
        style={{
          position: 'absolute',
          right: smallScreen ? 30 : 35,
          top: smallScreen ? 30 : 40,
          zIndex: 100,
        }}
      >
        <Button
          background="CancelButton"
          onPress={handleMenu}
          type="CancelButton"
        />
      </View>
      <View style={styles.container}>
        <Text type="formText">Login</Text>
        <TextInput
          placeholder="Enter your email..."
          value={loginEmail}
          onChangeText={(text: string) => setLoginEmail(text)}
          errorText={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Choose your password..."
          onChangeText={(text: string) => setLoginPassword(text)}
          secureTextEntry
          errorText={errors.password}
          autoCapitalize="none"
          value={loginPassword}
        />
        <Button
          background="GreenForms"
          text="Login"
          onPress={handleSignIn}
          type="Green"
        />
      </View>
    </ImageBackground>
  );
};
