import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { useLogin } from '../../util/auth';
import { TextInput } from '../CustomInput';
import Button from '../../components/buttons/Buttons';
import { Text } from '../Text';

export const LoginForm = () => {
  const { errors, submit, email, password, setEmail, setPassword } = useLogin();
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600);
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
