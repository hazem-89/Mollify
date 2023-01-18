import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/buttons/Buttons';
import { useLogin } from '../../util/auth';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';
type SignUpProps = {
  onClose?: () => void;
};
export const SignUpForm = ({ onClose }: SignUpProps) => {
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
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: smallScreen ? 200 : 300,
      MaxHeight: smallScreen ? 200 : 300,
      minWidth: smallScreen ? 500 : 600,
      MaxWidth: smallScreen ? 500 : 600,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ButtonsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: smallScreen ? 200 : 350,
      marginTop: smallScreen ? 30 : 20,
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <Text type="formText">Let’s register your account.</Text>
        <View style={{ maxHeight: smallScreen ? 40 : 50 }}>
          <TextInput
            placeholder="Enter your email..."
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            errorText={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={{ maxHeight: smallScreen ? 40 : 80 }}>
          <TextInput
            placeholder="Choose your password..."
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry
            errorText={errors.password}
            autoCapitalize="none"
            value={password}
          />
        </View>
        <View style={{ maxHeight: smallScreen ? 40 : 80 }}>
          <TextInput
            placeholder="Confirm Password"
            value={confirmedPassword}
            onChangeText={(text: string) => setConfirmedPassword(text)}
            secureTextEntry
            errorText={errors.confirmedPassword}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.ButtonsView}>
          <Button
            background="GreenForms"
            text="signUp"
            onPress={() => submit('signUp')}
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
