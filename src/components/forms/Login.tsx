import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { useLogin } from '../../util/auth';
import { TextInput } from '../CustomInput';
import Button from '../../components/buttons/Buttons';
import { Text } from '../Text';
type LoginProps = {
  onClose?: () => void;
};
export const LoginForm = ({ onClose }: LoginProps) => {
  const { errors, submit, email, password, setEmail, setPassword } = useLogin();
  const dimensions = useDimensions();
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      minHeight: smallScreen ? 200 : 300,
      MaxHeight: smallScreen ? 200 : 300,
      minWidth: smallScreen ? 400 : 600,
      MaxWidth: smallScreen ? 400 : 600,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ButtonsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: smallScreen ? 200 : 350,
      marginTop: 20,
    },
  });
  return (
    <View>
      <View style={styles.Container}>
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
        <View style={styles.ButtonsView}>
          <Button
            background="GreenForms"
            text="Login"
            onPress={() => submit('login')}
          />
          <Button
            background="Cancel"
            onPress={() => handleCancel()}
            text="Cancel"
          />
        </View>
      </View>
    </View>
  );
};
