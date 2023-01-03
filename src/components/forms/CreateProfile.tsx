import { useDimensions } from '@react-native-community/hooks';
import { addDoc, collection } from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { db } from '../../../firebaseConfig';
import { useLogin } from '../../util/auth';
import Button from '../buttons/Buttons';
import Carousel from '../Carousel';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';
import { avatars, rooms } from '../../util/itemObjects';

interface Profiles {
  mainUserId: string | undefined;
  name: string;
  pin: string;
  avatar: string;
  room: string;
}
export const CreateProfileForm = () => {
  const dimensions = useDimensions();
  const { currentUser } = useLogin();
  const [state, setState] = useState({
    name: '',
    pin: '',
    avatar: '',
    room: '',
  });

  const addProfileToUser = async () => {
    const newProfile: Profiles = {
      name: state.name,
      pin: state.pin,
      avatar: state.avatar,
      room: state.room,
      mainUserId: currentUser?.uid,
    };
    try {
      await addDoc(collection(db, 'profiles'), newProfile);
    } catch (err) {
      console.log(err);
    }
  };

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text type="formText">Add Profile</Text>
      <TextInput
        placeholder="Name"
        keyboardType="email-address"
        autoCapitalize="none"
        value={state.name}
        onChangeText={(text: string) => setState({ ...state, name: text })}
      />
      <TextInput
        placeholder="PIN code"
        secureTextEntry
        autoCapitalize="none"
        value={state.pin}
        keyboardType="phone-pad"
        onChangeText={(text: string) => setState({ ...state, pin: text })}
      />
      <Carousel
        titel="Choose avatar"
        onEmit={(selectedItem: any) =>
          setState({ ...state, avatar: selectedItem })
        }
        data={avatars}
      />
      <Carousel
        titel="Choose room"
        onEmit={(selectedItem: any) =>
          setState({ ...state, room: selectedItem })
        }
        data={rooms}
      />
      <Button
        background="GreenForms"
        text="Add profile"
        onPress={addProfileToUser}
      />
    </View>
  );
};
