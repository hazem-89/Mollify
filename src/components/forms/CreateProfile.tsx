import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../buttons/Buttons';
import { useLogin } from '../../util/auth';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';


export const CreateProfileForm = () => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: smallScreen ? 40 : 60,
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
    <View>
      <View
        style={{
          position: 'absolute',
          right: smallScreen ? 30 : 35,
          top: smallScreen ? 30 : 40,
        }}
      >
      </View>
      <View style={styles.container}>
        <Text type="formText">Let’s register your account.</Text>
        <TextInput
          placeholder="Name"
          // value={email}
          // onChangeText={(text: string) => setEmail(text)}
          // errorText={errors.email}
          keyboardType="email-address"
          autoCapitalize="none" />
        <TextInput
          placeholder="PIN code"
          // onChangeText={(text: string) => setPassword(text)}
          secureTextEntry
          // errorText={errors.PIN}
          autoCapitalize="none"
        // value={password} 
        />
        <Button
          background="GreenForms"
          text="Create account"
          onPress={() => console.log("clicked")}
        />
      </View>
    </View>
  );
};
