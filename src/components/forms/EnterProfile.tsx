import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import { useDataContext } from '../../util/context/DataContext';
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
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };
  const { setAsyncData, setLoggedInProfile } = useDataContext();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const navigation = useNavigation();
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
      marginTop: smallScreen ? 30 : 20,
    },
  });

  const handleSubmit = () => {
    // Compare pin from db to entered pin.
    if (PINState === selectedProfile.pin) {
      // Store the logged in profile in asyncStorage so data persists between app sessions
      setAsyncData('loggedInProfile', selectedProfile);
      setLoggedInProfile(selectedProfile);
      // @ts-ignore
      if (selectedProfile.parent !== true) navigation.push('RoomScreen');
      if (onClose) onClose();
    }
    if (PINState !== selectedProfile.pin) {
      Toast.show('Wrong PIN: Please check your PIN', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>{`Welcome ${selectedProfile.name}`}</Text> */}
      <Text type="MenuTitle">Enter your pin</Text>
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Enter PIN code"
          secureTextEntry
          autoCapitalize="none"
          keyboardType="numeric"
          value={PINState}
          onChangeText={changedPin => setPINState(changedPin)}
          style={{ fontSize: 20, marginBottom: 7, minWidth: 50 }}
        />
      </View>
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
