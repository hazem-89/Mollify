import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const styles = StyleSheet.create({
    container: {},
    menuBackground: {
      position: 'relative',
      height: smallScreen ? 500 : 1000,
      width: smallScreen ? 1000 : 1500,
      top: -200,
      right: smallScreen ? 200 : 200,
      backgroundColor: 'linear-gradient(to bottom right, rgba(0,0,0,0.7))',
    },
    btnsAlign: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      right: smallScreen ? '70%' : '12%',
      bottom: smallScreen ? '90%' : '31%',
      left: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoutAlign: {
      marginBottom: smallScreen ? 10 : 20,
    },
    settingsAlign: {
      marginBottom: smallScreen ? 10 : 40,
    },
  });
  return (
    <Animated.View style={{}}>
      <View style={styles.container}>
        <View style={styles.menuBackground}>
          <View style={styles.btnsAlign}>
            <Text type="Cancel">Change Profile</Text>
            <View style={styles.settingsAlign}>
              <Button
                background="ProfileIcon"
                onPress={() => handelNav('StartScreen')}
              />
            </View>
            <Text type="Cancel">Settings</Text>
            <View style={styles.settingsAlign}>
              <Button background="SettingsWheel" onPress={logout} />
            </View>
            <Text type="Cancel">Logout</Text>
            <View style={styles.logoutAlign}>
              <Button background="LogoutIcon" onPress={logout} />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default SidebarMenu;

