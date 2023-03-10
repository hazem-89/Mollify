/* eslint-disable react/no-unescaped-entities */
import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import RewardMainTitleBg from '../../../assets/images/RewardMainTitleBg.png';
import TigerMessage from '../../../assets/images/TigerMessage.png';
import { useLogin } from '../../util/auth';
import { useDataContext } from '../../util/context/DataContext';
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
  points: string;
  id?: string;
}

type CreateProfileProps = {
  // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
  profilesExist: boolean;
  onClose?: () => void;
  profile?: Profiles;
};
type ErrorType = {
  name?: string;
  pin?: string;
  room?: {};
  avatar?: {};
};
export const CreateProfileForm = ({
  profilesExist,
  profile,
  onClose,
}: CreateProfileProps) => {
  // const dimensions = useDimensions();
  const { currentUser } = useLogin();
  const dimensions = useDimensions();
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const [firstTime, setFirstTime] = useState(false);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const navigation = useNavigation();
  const {
    retrieveFSData,
    setProfiles,
    addDocToFS,
    updateFSDoc,
    setSelectedChild,
  } = useDataContext();
  const [state, setState] = useState({
    name: '',
    pin: '',
    avatar: '',
    room: '',
  });

  useEffect(() => {
    if (!profilesExist) {
      setFirstTime(true);
    } else {
      setFirstTime(false);
    }
    if (profile) {
      setState({
        ...state,
        name: profile.name,
        pin: profile.pin,
        avatar: profile.avatar,
        room: profile.room,
      });
    }
  }, []);

  const handleSubmit = () => {
    const nextErrors: ErrorType = {};

    if (!state.name) {
      nextErrors.name = 'Please enter a profile name.';
    }
    if (!state.pin) {
      nextErrors.pin = 'Please enter a profile pin.';
    }
    if (!state.avatar) {
      nextErrors.avatar = 'Please select an avatar.';
    }
    if (!state.room && profilesExist) {
      nextErrors.room = 'Please select a rom.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      if (!profile) {
        addProfileToUser();
      } else {
        updateProfile();
      }
      navigation.goBack();
    }
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }
    return null;
  };
  const updateProfile = () => {
    if (profile) {
      const updatedProfile: Profiles = {
        name: state.name,
        pin: state.pin,
        avatar: state.avatar,
        room: state.room,
        mainUserId: profile.mainUserId,
        points: profile.points,
        id: profile.id,
      };
      updateFSDoc('profiles', profile.id, updatedProfile).then(
        Toast.show('Profile updated successfully.  ', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        }),
        retrieveFSData('profiles', 'mainUserId', `${currentUser?.uid}`).then(
          (data: DocumentData[]) => {
            data && setProfiles(data);
          },
        ),
      );
      setSelectedChild(updatedProfile);
    }
  };
  const addProfileToUser = async () => {
    const newProfile: Profiles = {
      name: state.name,
      pin: state.pin,
      avatar: state.avatar,
      room: state.room,
      mainUserId: currentUser?.uid,
      points: '0',
    };
    try {
      (profilesExist
        ? addDocToFS('profiles', newProfile)
        : addDocToFS('profiles', {
            ...newProfile,
            room: null,
            parent: true,
            points: null,
          })
      ).then(
        retrieveFSData('profiles', 'mainUserId', `${currentUser?.uid}`).then(
          (data: DocumentData[]) => {
            data && setProfiles(data);
          },
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const styles = StyleSheet.create({
    container: {
      height: ScreenHeight,
      width: ScreenWidth,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 0.05 * ScreenHeight,
    },
    RewardMainTitleBg: {
      width: smallScreen ? 0.25 * ScreenWidth : 0.3 * ScreenWidth,
      height: 0.2 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },

    InputsView: {
      marginVertical: 0.025 * ScreenHeight,
    },
    Inputs: {
      backgroundColor: 'rgba(147, 53, 41, .8)',
      width: 0.3 * ScreenWidth,
      padding: 15,
      borderRadius: 20,
      marginBottom: 10,
    },
    TigerMessage: {
      width: smallScreen ? 0.45 * ScreenWidth : 0.6 * ScreenWidth,
      height: smallScreen ? 0.8 * ScreenHeight : 0.8 * ScreenHeight,
      position: 'absolute',
      left: 0.25 * ScreenWidth,
      bottom: 0.1 * ScreenHeight,
      zIndex: 999,
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginBottom: 0.05 * ScreenHeight,
    },
    FirstTimeText: {
      maxWidth: smallScreen ? 0.25 * ScreenWidth : 0.3 * ScreenWidth,
      height: 0.3 * ScreenHeight,
      padding: 0.02 * ScreenHeight,
      marginRight: smallScreen ? 0.04 * ScreenWidth : 0.05 * ScreenWidth,
      marginTop: smallScreen ? 0.04 * ScreenHeight : 0.06 * ScreenHeight,
    },
  });

  return (
    <View style={styles.container}>
      {!firstTime ? (
        <>
          <ImageBackground
            source={RewardMainTitleBg}
            style={styles.RewardMainTitleBg}
          >
            <View style={{ marginBottom: '8%' }}>
              <Text type="header">Add Profile</Text>
            </View>
          </ImageBackground>
          <ScrollView
            horizontal={false}
            style={{ width: 0.8 * ScreenWidth, maxHeight: 0.71 * ScreenHeight }}
          >
            <View style={{ alignItems: 'center', paddingBottom: 20 }}>
              <View style={styles.InputsView}>
                <TextInput
                  placeholder="Name"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={state.name}
                  onChangeText={(text: string) =>
                    setState({ ...state, name: text })
                  }
                  impStyle={styles.Inputs}
                  errorText={errors.name}
                />
                <TextInput
                  placeholder="PIN code"
                  secureTextEntry
                  autoCapitalize="none"
                  value={state.pin}
                  keyboardType="numeric"
                  onChangeText={(text: string) =>
                    setState({ ...state, pin: text })
                  }
                  impStyle={styles.Inputs}
                  errorText={errors.pin}
                />
              </View>
              <Carousel
                title="Choose avatar"
                onEmit={(selectedItem: any) =>
                  setState({ ...state, avatar: selectedItem })
                }
                data={avatars}
              />
              {profilesExist && (
                <Carousel
                  title="Choose room"
                  onEmit={(selectedItem: any) =>
                    setState({ ...state, room: selectedItem })
                  }
                  data={rooms}
                />
              )}
              <View
                style={{
                  marginVertical: 0.1 * ScreenHeight,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 0.4 * ScreenWidth,
                }}
              >
                <Button
                  background="GreenForms"
                  text={!profile ? 'Add profile' : 'Update profile '}
                  onPress={handleSubmit}
                  // disable={
                  //   !state.name || !state.avatar || !state.pin || !state.room
                  // }
                />
                <Button
                  background="Cancel"
                  text="Cancel"
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          {!profilesExist && firstTime && (
            <>
              <ImageBackground
                source={TigerMessage}
                style={styles.TigerMessage}
              >
                <View style={styles.FirstTimeText}>
                  <Text type="text">
                    Hello! Welcome to Mollify! This Your first profile, so it
                    will be your parent/admin profile.
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: smallScreen
                      ? 0.04 * ScreenWidth
                      : 0.05 * ScreenWidth,
                  }}
                >
                  <Button
                    background="GreenForms"
                    text="OK"
                    onPress={() => setFirstTime(false)}
                  />
                </View>
              </ImageBackground>
            </>
          )}
        </>
      )}
    </View>
  );
};
