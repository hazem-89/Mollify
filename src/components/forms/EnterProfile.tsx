import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MainStackParams } from '../../navigation/Main';
import Button from '../buttons/Buttons';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';

type EnterProfileProps = {
  name: any;
  pin: any;
  parent: any;
  onClose?: () => void;
};

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'RoomScreen'>;
};

export const EnterProfile = (
  { name, pin, parent, onClose }: EnterProfileProps,
  { navigation }: Props,
) => {
  const [PINState, setPINState] = useState('');
  const styles = StyleSheet.create({
    container: {},
  });

  const handleSubmit = () => {
    // Compare pin from db to entered pin.
    if (PINState === pin) {
      if (parent) {
        // If the profile is parent then navigate to selectProfile but with parent view
        // (parent wont need to enter pin for other profiles and wont see own profile again)
        // Set a global parent state to true
        console.log('This is a parent profile');
        if (onClose) onClose();
      } else {
        // Here the user gets navigated to their room.
        navigation.navigate('RoomScreen', {});
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>{`Welcome ${name}`}</Text>
      <Text type="formText">Enter your profile</Text>
      <TextInput
        placeholder="Enter PIN code"
        secureTextEntry
        autoCapitalize="none"
        value={PINState}
        onChangeText={changedPin => setPINState(changedPin)}
      />
      <Button
        background="GreenForms"
        text="Enter profile"
        onPress={handleSubmit}
      />
    </View>
  );
};
