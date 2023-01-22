import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text } from '../../components/Text';
import { useLogin } from '../../util/auth';
import Button from '../buttons/Buttons';

const SidebarMenu = () => {
  const { logout } = useLogin();
  const dimensions = useDimensions();
  const navigation = useNavigation();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState<
    string | undefined
  >();

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
      right: smallScreen ? 0 : '12%',
      bottom: smallScreen ? 0 : '31%',
      left: smallScreen ? '50%' : '80%',
      top: smallScreen ? '40%' : '25%',
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
    <View style={styles.container}>
      <View style={styles.menuBackground}>
        <View style={styles.btnsAlign}>
          <Text type="Cancel">Change Profile</Text>
          <View style={styles.settingsAlign}>
            <Button
              background="ProfileIcon"
              // @ts-ignore
              onPress={() => navigation.navigate('StartScreen')}
            />
          </View>
          <Text type="Cancel">Settings</Text>
          <View style={styles.settingsAlign}>
            <Button
              background="SettingsWheel"
              // @ts-ignore
              onPress={() => navigation.navigate('SettingsScreen')}
            />
          </View>
          <Text type="Cancel">Logout</Text>
          <View style={styles.logoutAlign}>
            <Button background="LogoutIcon" onPress={logout} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SidebarMenu;
