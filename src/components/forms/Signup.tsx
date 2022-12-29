import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/buttons/Buttons';
import { useLogin } from '../../util/auth';
import { TextInput } from '../forms/Form';
import { Text } from '../Text';

type SignUpProps = {
  signUpMenuOpen: boolean;
  setSignUpMenuOpen: Function;
};
export const SignUpForm = () => {
  const {
    errors,
    email,
    setEmail,
    password,
    setPassword,
    confirmedPassword,
    setConfirmedPassword,
    signup,
    submit,
  } = useLogin();
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const handelSignup = () => {
    submit();
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      signup(email, password);
    }

    if (Object.keys(errors).length === 0) {
      signup(email, password);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: smallScreen ? 40 : 60,
    },
  });
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          right: smallScreen ? 30 : 35,
          top: smallScreen ? 30 : 40,
        }}
      ></View>
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
          onPress={() => {
            handelSignup();
          }}
        />
      </View>
    </View>
  );
};
