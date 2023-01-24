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
import TigerAvatar from '../../../assets/images/Avatars/Avatar-Tiger.png';
import SelectFormMenu from '../../../assets/images/SelectFormMenu.png';
import Button from '../../components/buttons/Buttons';
import { Text } from '../../components/Text';
import { useLogin } from '../../util/auth';
import { useDataContext } from '../../util/context/DataContext';
import { CreateProfileForm } from '../forms/CreateProfile';
import EnterProfile from '../forms/EnterProfile';
import FormModal from '../modals/FormModal';

const SelectProfile = () => {
  const [component, setComponent] = useState<ReactElement | undefined>();
  const dimensions = useDimensions();
  const navigation = useNavigation();

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const {
    profiles,
    loggedInProfile,
    filteredProfiles,
    setSelectedChild,
    setTasks,
    setRewards,
    retrieveFSData,
    setProfiles,
  } = useDataContext();
  const { currentUser } = useLogin();

  // useEffect(() => {
  //   const fetchProfile = () => {
  //     const test = retrieveFSData(
  //       'profiles',
  //       'mainUserId',
  //       `${currentUser?.uid}`,
  //     ).then((data: DocumentData[]) => {
  //       data ? setProfiles(data) : setProfiles([]);
  //     });
  //   };
  //   fetchProfile();
  // }, []);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      top: 0.065 * ScreenHeight,
      width: smallScreen ? 0.6 * ScreenWidth : 0.7 * ScreenWidth,
      height: 0.9 * ScreenHeight,
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
      backgroundColor: '#FF7A00',
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
            alignItems: 'center',
            maxWidth: 0.5 * ScreenWidth,
          }}
        >
          {loggedInProfile && loggedInProfile.parent ? (
            <Text type="header">
              Welcome {loggedInProfile.name}, select profile to manage
            </Text>
          ) : (
            <View style={{ maxWidth: 0.4 * ScreenWidth }}>
              {!profiles ? (
                <Text type="header">
                  Welcome! Start by Adding a parent profile
                </Text>
              ) : (
                <Text type="header">Select profile</Text>
              )}
            </View>
          )}
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
            {filteredProfiles
              ? filteredProfiles?.map((profile: DocumentData) => (
                  <TouchableOpacity
                    key={profile?.id}
                    onPress={() => handleClick('ManageProfile', profile)}
                  >
                    <View style={styles.profile}>
                      <View style={styles.Avatar}>
                        <Image
                          source={TigerAvatar}
                          style={{
                            width: smallScreen ? 50 : 75,
                            height: smallScreen ? 50 : 75,
                          }}
                        />
                      </View>
                      <Text type="text">{profile?.name.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              : profiles?.map((profile: DocumentData) => (
                  <TouchableOpacity
                    key={profile?.id}
                    onPress={() => handleClick('EnterPIN', profile)}
                  >
                    <View style={styles.profile}>
                      <View style={styles.Avatar}>
                        <Image
                          source={TigerAvatar}
                          style={{
                            width: smallScreen ? 50 : 75,
                            height: smallScreen ? 50 : 75,
                          }}
                        />
                      </View>
                      <Text type="text">{profile?.name.toUpperCase()}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
          </View>
        </View>
      </ImageBackground>
      <FormModal component={component} />
    </>
  );
};

export default SelectProfile;

