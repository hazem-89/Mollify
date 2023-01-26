import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { Text } from '../../components/Text';
import { useLogin } from '../../util/auth';
import { useDataContext } from '../../util/context/DataContext';
import Button from '../buttons/Buttons';

type SidebarMenuProps = {
  screen?: string;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SidebarMenu = ({ screen, setSideBarOpen }: SidebarMenuProps) => {
  const { logout } = useLogin();
  const dimensions = useDimensions();
  const navigation = useNavigation();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const { loggedInProfile, setLoggedInProfile } = useDataContext();

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
          {screen === 'startScreen' &&
          loggedInProfile &&
          loggedInProfile.parent ? (
            <View style={styles.settingsAlign}>
              <Button
                background="ProfileIcon"
                onPress={() => {
                  setLoggedInProfile(undefined);
                  setSideBarOpen(false);
                }}
              />
              <Text type="Cancel">Exit current profile</Text>
            </View>
          ) : (
            <View style={styles.settingsAlign}>
              {screen !== 'startScreen' && (
                <>
                  <Button
                    background="ProfileIcon"
                    // @ts-ignore
                    onPress={() => navigation.navigate('StartScreen')}
                  />
                  <Text type="Cancel">Change Profile</Text>
                </>
              )}
            </View>
          )}

          <View style={styles.settingsAlign}>
            <Button
              background="SettingsWheel"
              onPress={() =>
                // @ts-ignore

                navigation.navigate('SettingsScreen')
              }
            />
            <Text type="Cancel">Settings</Text>
          </View>
          <View style={styles.settingsAlign}>
            <Button
              background="InfoButtonImage"
              onPress={() =>
                // @ts-ignore

                navigation.navigate('AboutScreen')
              }
            />
            <Text type="Cancel">About</Text>
          </View>
          <View style={styles.logoutAlign}>
            <Button
              background="LogoutIcon"
              onPress={() => {
                logout();
                setSideBarOpen(false);
              }}
            />
            <Text type="Cancel">Logout</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SidebarMenu;

