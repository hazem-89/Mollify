import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
  const { storeAsyncData } = useDatabaseContext();
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
  const handleSubmit = () => {
    // Compare pin from db to entered pin.
    if (PINState === selectedProfile.pin) {
      // Store the logged in profile in asyncStorage so data persists between app sessions
      storeAsyncData('loggedInProfile', selectedProfile);
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
    <View style={styles.container}>
      {/* <Text>{`Welcome ${selectedProfile.name}`}</Text> */}
      <Text type="formText">Enter your pin</Text>
      <TextInput
        placeholder="Enter PIN code"
        secureTextEntry
        autoCapitalize="none"
        keyboardType="numeric"
        value={PINState}
        onChangeText={changedPin => setPINState(changedPin)}
      />
      <View style={styles.ButtonsView}>
        <Button
          background="GreenForms"
          text="Enter profile"
          onPress={handleSubmit}
        />
        <Button
          background="Cancel"
          onPress={() => handleCancel()}
          text="Cancel"
        />
      </View>
    </View>
  );
}
