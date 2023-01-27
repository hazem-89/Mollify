/* eslint-disable prettier/prettier */
import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Dimensions, ImageBackground,
  StyleSheet, View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SelectFormMenu from '../../../assets/images/SelectFormMenu.png';
import Button from '../../components/buttons/Buttons';
import { Text } from '../../components/Text';
import { useDataContext } from '../../util/context/DataContext';
import ProfileButton from '../buttons/profileButton';
import { CreateProfileForm } from '../forms/CreateProfile';
import EnterProfile from '../forms/EnterProfile';
import FormModal from '../modals/FormModal';

const SelectProfile = () => {
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [mainText, setMainText] = useState<string | undefined>();
  const dimensions = useDimensions();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const navigation = useNavigation();
  const {
    profiles,
    loggedInProfile,
    setSelectedChild,
    setTasks,
    setRewards,
  } = useDataContext();

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
      width: '80%',
    },
  });

  const handleNav = () => {
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
          // @ts-ignore
          navigation.navigate('RoomScreen');
        }
        break;
      default:
        setComponent(undefined);
        break;
    }
  }

  return (
    <>
      <ImageBackground source={SelectFormMenu} style={styles.modal}
        resizeMode="stretch">
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
                  onPress={() => handleNav()}
                />
              </View>
            </>
          ) : null}
          <ScrollView contentContainerStyle={{
            paddingHorizontal: 10,
          }} horizontal={true} style={styles.ProfilesView}>
            {loggedInProfile && loggedInProfile.parent
              ? profiles?.map((profile: DocumentData) => {
                if (profile.parent === true) {
                  return null;
                }
                return (
                  <ProfileButton
                    key={profile.id}
                    onpress={() => handleClick('ManageProfile', profile)}
                    profile={profile} />
                )
              })
              : profiles?.map((profile: DocumentData) => (
                <ProfileButton key={profile.id} onpress={() => handleClick('EnterPIN', profile)} profile={profile} />
              ))}
          </ScrollView>
        </View>
      </ImageBackground>
      <FormModal component={component} />
    </>
  );
};

export default SelectProfile;
