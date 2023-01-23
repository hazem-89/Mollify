import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import sidebarBackground from '../../../assets/images/sidebarBackground.png';
import { useLogin } from '../../util/auth';
import Button from '../buttons/Buttons';
import { Text } from '../../components/Text';
import { useDimensions } from '@react-native-community/hooks';
import SelectProfile from './SelectProfile';
import { useNavigation } from '@react-navigation/native';

const SidebarMenu = () => {
  const { logout } = useLogin();
  const dimensions = useDimensions();
  const navigation = useNavigation();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const handelNav = (navigationValue: string) => {
    // @ts-ignore
    navigationValue === 'StartScreen' && navigation.goBack();
  };
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      minWidth: ScreenWidth,
      minHeight: ScreenHeight,
      maxHeight: ScreenHeight,
    },
    menuBackground: {
      height: '100%',
      minWidth: ScreenWidth,
      backgroundColor: 'rgba(0,0,0,0.7))',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    btnsAlign: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 0.05 * ScreenWidth,
    },
    logoutAlign: {
      marginBottom: smallScreen ? 10 : 20,
    },
    settingsAlign: {
      marginBottom: smallScreen ? 10 : 40,
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.menuBackground}>
        <View style={styles.btnsAlign}>
          <View style={styles.settingsAlign}>
            <Button
              background="ProfileIcon"
              onPress={() => handelNav('StartScreen')}
            />
            <Text type="Cancel">Change Profile</Text>
          </View>
          <View style={styles.settingsAlign}>
            <Button background="SettingsWheel" onPress={() => undefined} />
            <Text type="Cancel">Settings</Text>
          </View>
          <View style={styles.logoutAlign}>
            <Button background="LogoutIcon" onPress={logout} />
            <Text type="Cancel">Logout</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SidebarMenu;
