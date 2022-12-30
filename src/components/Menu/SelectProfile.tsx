import {
  Animated,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useLogin } from '../../util/auth';
import { useDimensions } from '@react-native-community/hooks';
import SelectFormMenu from '../../../assets/Images/SelectFormMenu.png';
import Button from '../../components/buttons/Buttons';
import { Text } from '../../components/Text';
import FormModal from '../modals/FormModal';
import TigerAvatar from '../../../assets/Images/Avatars/Avatar-Tiger.png';
interface Profiles {
  id: string;
  name: string;
  pin: number;
  avatar: object;
}
const mockupProfiles: Profiles[] = [
  {
    id: '1',
    name: 'Malva',
    pin: 1234,
    avatar: { TigerAvatar },
  },
  {
    id: '2',
    name: 'Matteo',
    pin: 1234,
    avatar: { TigerAvatar },
  },
  {
    id: '3',
    name: 'Leya',
    pin: 1234,
    avatar: { TigerAvatar },
  },
];
const SelectProfile = () => {
  const { currentUser, logout } = useLogin();
  const dimensions = useDimensions();
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const handleEmit = useCallback((value: undefined) => {
    setBtnClicked(value); // This function will be called by the child component to emit a prop
  }, []);
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
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
    formView: {
      position: 'absolute',
      top: smallScreen ? '15%' : '15%',
      left: smallScreen ? '50%' : '50%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
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
            onPress={() => setBtnClicked('CreateProfileForm')}
          />
        </View>
        <View style={styles.ProfilesView}>
          {mockupProfiles.map(profile => (
            <TouchableOpacity
              key={profile.id}
              onPress={() => setBtnClicked('ProfilePin')}
            >
              <View style={styles.profile}>
                <View style={styles.Avatar}>
                  <Image
                    source={TigerAvatar}
                    style={{
                      width: smallScreen ? 50 : 75,
                      height: smallScreen ? 50 : 75,
                      // marginVertical: 30,
                    }}
                  />
                </View>

                <Text type="text">{profile.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* <Text></Text> */}
      </View>
      <View style={styles.formView}>
        <FormModal onEmit={handleEmit} formName={btnClicked} />
      </View>
    </ImageBackground>
  );
};

export default SelectProfile;

const styles = StyleSheet.create({});
