import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../buttons/Buttons';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';

type EnterProfileProps = {
  name: any;
  pin: any;
  parent: any;
  onClose?: () => void;
};

export const EnterProfile = ({
  name,
  pin,
  parent,
  onClose,
}: EnterProfileProps) => {
  const [PINState, setPINState] = useState('');
  const styles = StyleSheet.create({
    container: {},
  });
  const navigation = useNavigation();

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
        console.log(navigation);
        // Disabling the next line because all the item.targets are valid - that data just isn't getting picked up by TypeScript
        // @ts-ignore
        navigation.navigate('RoomScreen');
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
