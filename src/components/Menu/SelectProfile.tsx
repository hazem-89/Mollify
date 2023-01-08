import { useDimensions } from '@react-native-community/hooks';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TigerAvatar from '../../../assets/Images/Avatars/Avatar-Tiger.png';
import SelectFormMenu from '../../../assets/Images/SelectFormMenu.png';
import { db } from '../../../firebaseConfig';
import Button from '../../components/buttons/Buttons';
import { Text } from '../../components/Text';
import { useLogin } from '../../util/auth';
import { CreateProfileForm } from '../forms/CreateProfile';
import { EnterProfile } from '../forms/EnterProfile';
import FormModal from '../modals/FormModal';

const SelectProfile = () => {
  const { currentUser } = useLogin();
  // const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [profilesExist, setProfilesExist] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<DocumentData[]>([]);
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);

  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      top: smallScreen ? '15%' : '8%',
      width: smallScreen ? 500 : 700,
      height: smallScreen ? 300 : 500,
    },
    MainView: {
      position: 'absolute',
      top: smallScreen ? '5%' : '5%',
      width: '80%',
      height: smallScreen ? 300 : 500,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginLeft: '20%',
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

  // const handleEmit = useCallback((value: undefined) => {
  //   setBtnClicked(value); // This function will be called by the child component to emit a prop.
  // }, []);

  useEffect(() => {
    if (currentUser) getProfiles();
  }, [currentUser]);

  async function getProfiles() {
    const profilesRef = collection(db, 'profiles');
    const searchQuery = query(
      profilesRef,
      where('mainUserId', '==', `${currentUser?.uid}`),
    );

    const querySnapshot = await getDocs(searchQuery);
    if (querySnapshot.size > 0) {
      setProfilesExist(true);
      querySnapshot.forEach(doc => {
        setProfiles(prevProfiles => [...prevProfiles, doc.data()]);
      });
    } else {
      setProfilesExist(false);
    }
  }

  function handleClick(state: string | undefined, profile?: DocumentData) {
    // setBtnClicked(state);
    switch (state) {
      case 'CreateProfile':
        setComponent(<CreateProfileForm profilesExist={profilesExist} />);
        break;
      case 'EnterPIN':
        setComponent(
          <EnterProfile
            name={profile?.name}
            pin={profile?.pin}
            parent={profile?.parent}
          />,
        );
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
            marginTop: smallScreen ? 80 : 150,
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Text type="header">Select profile to View</Text>
        </View>
        <View style={styles.MainView}>
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
              onPress={() => handleClick('CreateProfile')}
            />
          </View>
          <View style={styles.ProfilesView}>
            {profiles.map(profile => (
              <TouchableOpacity
                key={profile.name}
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

                  <Text type="text">{profile.name}</Text>
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
