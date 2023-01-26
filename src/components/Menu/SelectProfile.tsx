/* eslint-disable prettier/prettier */
import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SelectFormMenu from '../../../assets/images/SelectFormMenu.png';
import Button from '../../components/buttons/Buttons';
import { Text } from '../../components/Text';
import { useDataContext } from '../../util/context/DataContext';
import { avatars } from '../../util/itemObjects';
import { CreateProfileForm } from '../forms/CreateProfile';
import EnterProfile from '../forms/EnterProfile';
import FormModal from '../modals/FormModal';
import { Audio } from 'expo-av';

const SelectProfile = () => {
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [mainText, setMainText] = useState<string | undefined>();
  const dimensions = useDimensions();
  const navigation = useNavigation();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const {
    profiles,
    loggedInProfile,
    filteredProfiles,
    setSelectedChild,
    setTasks,
    setRewards,
  } = useDataContext();
  useEffect(() => {
    (async () => {
      const sound1 = new Audio.Sound();
      sound1.loadAsync(require('../../../assets/sounds/selected.mp3'));
      setSound(sound1);
    })();
  }, []);

  const handlePlaySound = async () => {
    setButtonPressed(!buttonPressed);

    if (sound && sound._loaded) {
      await sound.playAsync();
    }
  };
  useEffect(() => {
    getMainText();
  }, [profiles, loggedInProfile]);

  const getMainText = () => {
    if (!profiles) {
      setMainText('Welcome! Start by Adding a parent profile');
    } else {
      if (profiles.length === 1) {
        if (!loggedInProfile) {
          setMainText(
            'Login to your parent profile, to add a new child profile',
          );
        }
        if (loggedInProfile && loggedInProfile.parent) {
          setMainText(
            `Welcome ${loggedInProfile.name.toUpperCase()}, Start creating a new child profile`,
          );
        }
      }
      if (profiles.length > 1) {
        if (!loggedInProfile) {
          setMainText('Select profile');
        }
        if (loggedInProfile && loggedInProfile.parent) {
          setMainText(`Welcome ${loggedInProfile.name.toUpperCase()}
            Select profile to manage`);
        }
      }
    }
  };

  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      top: smallScreen ? 5 : 20,
      width: smallScreen ? 0.7 * ScreenWidth : 0.75 * ScreenWidth,
      height: smallScreen ? ScreenHeight : 0.9 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    MainView: {
      width: 0.45 * ScreenWidth,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    ProfilesView: {
      flexDirection: 'row',
      width: '80%',
    },
    profile: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginLeft: 10,
    },
    Avatar: {
      width: smallScreen ? 70 : 100,
      height: smallScreen ? 70 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#067B7B',
      borderRadius: 500,
    },
  });
  const handelNav = () => {
    // console.log(navigationValue);
    // @ts-ignore
    navigation.navigate('TasksCategoryPage', {
      paramKey: {
        content: 'CreateProfile',
      },
    });
  };
  function handleClick(state: string | undefined, profile?: DocumentData) {
    // setBtnClicked(state);
    switch (state) {
      case 'CreateProfile':
        setComponent(<CreateProfileForm profilesExist={!!profiles} />);
        break;
      case 'EnterPIN':
        if (profile) setComponent(<EnterProfile selectedProfile={profile} />);
        break;
      case 'ManageProfile':
        if (profile) {
          setTasks([]);
          setRewards([]);
          setSelectedChild(profile);
        }
        break;
      default:
        setComponent(undefined);
        break;
    }
  }

  return (
    <>
      <ImageBackground source={SelectFormMenu} style={styles.modal}>
        <View
          style={{
            maxWidth: 0.5 * ScreenWidth,
            marginBottom: 0.05 * ScreenHeight,
          }}
        >
          <Text type="header">{mainText}</Text>
        </View>
        <View style={styles.MainView}>
          {(loggedInProfile && loggedInProfile.parent) || !profiles ? (
            <>
              <View
                style={{
                  width: '10%',
                  marginRight: 20,
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Button
                  background="AddButtonImage"
                  onPress={() => handelNav()}
                />
              </View>
            </>
          ) : (
            <></>
          )}

          <View style={styles.ProfilesView}>
            {filteredProfiles && loggedInProfile && loggedInProfile.parent
              ? filteredProfiles?.map((profile: DocumentData) => {
                  let profileImage;
                  avatars.filter(avatar =>
                    avatar.id === profile.avatar
                      ? (profileImage = avatar.image)
                      : null,
                  );
                  return (
                    <TouchableOpacity
                      key={profile?.id}
                      onPress={() => {
                        handleClick('ManageProfile', profile);
                        handlePlaySound();
                      }}
                    >
                      <View style={styles.profile}>
                        <View style={styles.Avatar}>
                          <Image
                            source={profileImage}
                            style={{
                              width: smallScreen ? 50 : 75,
                              height: smallScreen ? 50 : 75,
                            }}
                          />
                        </View>
                        <Text type="text">{profile?.name.toUpperCase()}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : profiles?.map((profile: DocumentData) => {
                  let profileImage;
                  avatars.filter(avatar =>
                    avatar.id === profile.avatar
                      ? (profileImage = avatar.image)
                      : null,
                  );
                  return (
                    <TouchableOpacity
                      key={profile?.id}
                      onPress={() => {
                        handleClick('EnterPIN', profile);
                        handlePlaySound();
                      }}
                    >
                      <View style={styles.profile}>
                        <View
                          style={{
                            width: smallScreen ? 70 : 100,
                            height: smallScreen ? 70 : 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: profile.parent
                              ? '#2BC899'
                              : '#067B7B',
                            borderRadius: 500,
                          }}
                        >
                          <Image
                            source={profileImage}
                            style={{
                              width: smallScreen ? 50 : 75,
                              height: smallScreen ? 50 : 75,
                            }}
                          />
                        </View>
                        <Text type="text">{profile?.name.toUpperCase()}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
          </View>
        </View>
      </ImageBackground>
      <FormModal component={component} />
    </>
  );
};

export default SelectProfile;
