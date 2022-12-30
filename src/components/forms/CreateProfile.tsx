import { useDimensions } from '@react-native-community/hooks';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { db } from '../../../firebaseConfig';
import Button from '../buttons/Buttons';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';
import { updateProfile, User } from 'firebase/auth';
import { useLogin } from '../../util/auth';
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

  const handelAddProfileToUSer = async () => {
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
    backGroundImage: {
      flex: 1,
      zIndex: 3,
      position: 'relative',
    },
  });

  return (
    <View>
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
        <Button
          background="GreenForms"
          text="Create account"
          onPress={handelAddProfileToUSer}
        />
      </View>
    </View>
  );
};
