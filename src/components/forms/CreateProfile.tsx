/* eslint-disable react/no-unescaped-entities */
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { db } from '../../../firebaseConfig';
import { useLogin } from '../../util/auth';
import { useDatabaseContext } from '../../util/context/DBContext';
import { avatars, rooms } from '../../util/itemObjects';
import Button from '../buttons/Buttons';
import Carousel from '../Carousel';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';

interface Profiles {
  mainUserId: string | undefined;
  name: string;
  pin: string;
  avatar: string;
  room: string;
}

type CreateProfileProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  profilesExist: boolean;
  onClose?: () => void;
};

export const CreateProfileForm = ({
  profilesExist,
  onClose,
}: CreateProfileProps) => {
  // const dimensions = useDimensions();
  const { currentUser } = useLogin();
  const { retrieveProfiles } = useDatabaseContext();
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
      (profilesExist
        ? addDoc(collection(db, 'profiles'), newProfile)
        : addDoc(collection(db, 'profiles'), {
          parent: true,
          ...newProfile,
        })
      ).then(retrieveProfiles());
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
      paddingBottom: 60,
    },
  });

  const handleSubmit = () => {
    addProfileToUser();
    if (onClose) {
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add Profile</Text>
      {!profilesExist && (
        <Text type="formText">
          Since this is the first profile on this account it will be used as the
          parent profile. The parent profile is the one used to manage the to-do
          list's of the other profiles.
        </Text>
      )}
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
        keyboardType="numeric"
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
        onPress={handleSubmit}
      />
    </View>
  );
};
