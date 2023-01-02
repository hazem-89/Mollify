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
import { avatars } from '../../util/itemObjects';

interface Profiles {
  id?: string;
  mainUserId?: string;
  name: string;
  pin: string;
  avatar?: object;
}
export const CreateProfileForm = () => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const { currentUser } = useLogin();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');

  const addProfileToUser = async () => {
    const newProfile: Profiles = {
      name,
      pin,
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
      flex: 1,
      padding: smallScreen ? 40 : 60,
    },
  });

  /* type these params */
  const handleEmit = useCallback((selectedItem: any) => {
    console.log(selectedItem);
  }, []);

  return (
      <View style={styles.container}>
        <Text type="formText">Add Profile</Text>
        <TextInput
          placeholder="Name"
          keyboardType="email-address"
          autoCapitalize="none"
          value={name}
          onChangeText={(text: string) => setName(text)}
        />
        <TextInput
          placeholder="PIN code"
          secureTextEntry
          autoCapitalize="none"
          value={pin}
          onChangeText={(text: string) => setPin(text)}
        />
        {/* data = avatar objects, avatar id, avatar image */}
        <Carousel titel='Choose avatar' onEmit={handleEmit} data={avatars} />
        {/* data = room objects, room id, room image */}
        <Carousel titel='Choose room' onEmit={handleEmit} data={avatars} />
        <Button
          background="GreenForms"
          text="Create account"
          onPress={addProfileToUser}
        />
      </View>
  );
};
