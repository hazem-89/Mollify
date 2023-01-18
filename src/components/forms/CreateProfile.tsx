/* eslint-disable react/no-unescaped-entities */
import { addDoc, collection, DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { db } from '../../../firebaseConfig';
import { useLogin } from '../../util/auth';
import { useDataContext } from '../../util/context/DataContext';
import { avatars, rooms } from '../../util/itemObjects';
import Button from '../buttons/Buttons';
import Carousel from '../Carousel';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';
import RewardMainTitleBg from '../../../assets/images/RewardMainTitleBg.png';
import { useDimensions } from '@react-native-community/hooks';
import TigerMessage from '../../../assets/images/TigerMessage.png';

interface Profiles {
  mainUserId: string | undefined;
  name: string;
  pin: string;
  avatar: string;
  room: string;
  points: string;
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
  const dimensions = useDimensions();
  const [firstTime, setFirstTime] = useState(false);
  const { retrieveFSData, setProfiles, profiles, addDocToFS } =
    useDataContext();
  const [state, setState] = useState({
    name: '',
    pin: '',
    avatar: '',
    room: '',
  });
  useEffect(() => {
    !profilesExist ? setFirstTime(true) : setFirstTime(false);
  }, []);
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
            if (data) setProfiles(data);
          },
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [smallScreen] = useState(dimensions.screen.height < 600);

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

    Inputs: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      width: 0.3 * ScreenWidth,
      padding: 10,
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
      // position: 'absolute',
      maxWidth: smallScreen ? 0.25 * ScreenWidth : 0.3 * ScreenWidth,
      height: 0.3 * ScreenHeight,
      // left: 0.04 * ScreenWidth,
      // top: 0.04 * ScreenHeight,

      padding: 0.02 * ScreenHeight,
      marginRight: smallScreen ? 0.04 * ScreenWidth : 0.05 * ScreenWidth,
      marginTop: smallScreen ? 0.04 * ScreenHeight : 0.06 * ScreenHeight,
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
      {!firstTime ? (
        <>
          <ImageBackground
            source={RewardMainTitleBg}
            style={styles.RewardMainTitleBg}
          >
            <View style={{ marginBottom: '10%' }}>
              <Text type="header">Add Profile</Text>
            </View>
          </ImageBackground>
          <ScrollView horizontal={false} style={{}}>
            <View style={{ alignItems: 'center', paddingBottom: 200 }}>
              <TextInput
                placeholder="Name"
                keyboardType="email-address"
                autoCapitalize="none"
                value={state.name}
                onChangeText={(text: string) =>
                  setState({ ...state, name: text })
                }
                impStyle={styles.Inputs}
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
              />
              <Carousel
                titel="Choose avatar"
                onEmit={(selectedItem: any) =>
                  setState({ ...state, avatar: selectedItem })
                }
                data={avatars}
              />
              {profilesExist && (
                <Carousel
                  titel="Choose room"
                  onEmit={(selectedItem: any) =>
                    setState({ ...state, room: selectedItem })
                  }
                  data={rooms}
                />
              )}
              <View style={{ marginVertical: 0.1 * ScreenHeight }}>
                <Button
                  background="GreenForms"
                  text="Add profile"
                  onPress={handleSubmit}
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
