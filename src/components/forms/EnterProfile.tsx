import { useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useDatabaseContext } from '../../util/context/DBContext';
import Button from '../buttons/Buttons';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';

type EnterProfileProps = {
  selectedProfile: DocumentData;
  onClose?: () => void;
};

export default function EnterProfile({
  selectedProfile,
  onClose,
}: EnterProfileProps) {
  const [PINState, setPINState] = useState('');
  const navigation = useNavigation();
  const { storeAsyncData, setLoggedInProfile } = useDatabaseContext();

  const handleSubmit = () => {
    // Compare pin from db to entered pin.
    if (PINState === selectedProfile.pin) {
      // Store the logged in profile in asyncStorage so data persists between app sessions
      storeAsyncData('loggedInProfile', selectedProfile);
      setLoggedInProfile(selectedProfile);
      if (selectedProfile.parent) {
        // If the profile is parent then navigate to selectProfile but with parent view
        // (parent wont need to enter pin for other profiles and wont see own profile again)
        // Set a global parent state to true

        console.log('This is a parent profile');
        if (onClose) onClose();
      } else {
        // Here the user gets navigated to their room.
        // Disabling the next line because all the item.targets are valid - that data just isn't getting picked up by TypeScript
        // @ts-ignore
        navigation.navigate('RoomScreen');
      }
    }
  };

  return (
    <View>
      <Text>{`Welcome ${selectedProfile.name}`}</Text>
      <Text type="formText">Enter your profile</Text>
      <TextInput
        placeholder="Enter PIN code"
        secureTextEntry
        autoCapitalize="none"
        keyboardType="numeric"
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
}
