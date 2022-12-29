import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/buttons/Buttons';
import { useLogin } from '../../util/auth';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';

export const SignUpForm = () => {
  const {
    errors,
    email,
    setEmail,
    password,
    setPassword,
    confirmedPassword,
    setConfirmedPassword,
    submit,
  } = useLogin();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: smallScreen ? 40 : 60,
    },
  });

  return (
    <View>
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
          onPress={() => submit('signUp')}
        />
      </View>
    </View>
  );
};
