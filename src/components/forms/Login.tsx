import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import FormTemp from '../../../assets/Images/paperFormTEMP.png';
import { useLogin } from '../../util/auth';
import { TextInput } from '../CustomInput';
import Button from '../../components/buttons/Buttons';
import { Text } from '../Text';
import { useDimensions } from '@react-native-community/hooks';

export const LoginForm = () => {
  const { login, errors, submit, email, password, setEmail, setPassword } =
    useLogin();
  const dimensions = useDimensions();
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  // const handleSignIn = async () => {
  //   submit('login');
  //   console.log(errors);

  //   try {
  //     if (Object.keys(errors).length === 0) {
  //       console.log('login');

  //       await login(loginEmail, loginPassword);
  //     }
  //   } catch (error) {
  //     console.error('login failed' + error);
  //   }
  // };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: smallScreen ? 40 : 60,
    },
  });
  return (
    <View>
      <View style={styles.container}>
        <Text type="formText">Login</Text>
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
        <Button
          background="GreenForms"
          text="Login"
          onPress={() => submit('login')}
        />
      </View>
    </View>
  );
};
