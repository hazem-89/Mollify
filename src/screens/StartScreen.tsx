import { useDimensions } from '@react-native-community/hooks';
import { useFocusEffect } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MainBackGround from '../../assets/images/MainBackGround.png';
import Tiger from '../../assets/images/tiger-min.png';
import WelcomeSign from '../../assets/images/WelcomeSign.png';
import Button from '../components/buttons/Buttons';
import { LoginForm } from '../components/forms/Login';
import { SignUpForm } from '../components/forms/Signup';
import SelectProfile from '../components/menu/SelectProfile';
import SidebarMenu from '../components/menu/SidebarMenu';

import FormModal from '../components/modals/FormModal';
import { Text } from '../components/Text';
import { useLogin } from '../util/auth';
import { useDataContext } from '../util/context/DataContext';

export default function StartScreen() {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [component, setComponent] = useState<ReactElement | undefined>();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { currentUser, logout } = useLogin();
  const {
    setSelectedChild,
    loggedInProfile,
    setLoggedInProfile,
    setTasks,
    setRewards,
  } = useDataContext();
  const [text, setText] = useState<string | undefined>();

  useFocusEffect(
    React.useCallback(() => {
      // focused StartScreen, reset states
      if (loggedInProfile && !('parent' in loggedInProfile)) {
        setLoggedInProfile(undefined);
      }
      setSelectedChild(undefined);
      setTasks([]);
      setRewards([]);
      // return () => {
      // uncomment if you want to do something when leaving startScreen
      // };
    }, []),
  );
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    WelcomeSign: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: 0.5 * ScreenWidth,
      height: 0.25 * ScreenHeight,
      top: 0.03 * ScreenHeight,
      marginBottom: 0.02 * ScreenHeight,
      zIndex: 5,
    },
    WelcomeSignSelectProfile: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: 0.45 * ScreenWidth,
      height: 0.25 * ScreenHeight,
      top: 0.01 * ScreenHeight,
      marginBottom: 0.02 * ScreenHeight,
      zIndex: 5,
    },
    Background: {
      position: 'relative',
      width: ScreenWidth,
      height: ScreenHeight,
    },
    tiger: {
      position: 'absolute',
      bottom: 0,
      left: smallScreen ? '15%' : '18%',
      flex: 1,
      height: 180,
      width: 130,
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      display: 'flex',
      // alignItems: 'center',
      // zIndex: 1
    },
    sidebar: {
      // flex: 1,
      display: sideBarOpen ? 'flex' : 'none',
      position: 'relative',
    },
  });

  function handleClick(state: string | undefined) {
    setBtnClicked(state);
    switch (state) {
      case 'Login':
        setComponent(<LoginForm />);
        setText('Login');
        break;
      case 'SignUp':
        setComponent(<SignUpForm />);
        setText('Sign Up');
        break;
      case 'GoogleSignIn':
        setComponent(undefined);
        break;
      default:
        setComponent(undefined);
        break;
    }
  }

  return (
    <>
      <ImageBackground source={MainBackGround} style={styles.Background} />
      <SafeAreaView style={styles.SafeArea}>
        {currentUser ? (
          <TouchableOpacity
            onPress={() => setSideBarOpen(false)}
            activeOpacity={1}
          >
            <>
              {sideBarOpen && (
                <View style={styles.sidebar}>
                  <SidebarMenu screen="startScreen" />
                </View>
              )}
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={WelcomeSign}
                  style={styles.WelcomeSignSelectProfile}
                />

                <SelectProfile />
                <View style={{ position: 'absolute', top: 50, right: 50 }}>
                  <Button
                    background="MenuIcon"
                    onPress={() => setSideBarOpen(true)}
                  />
                </View>
              </View>
            </>
          </TouchableOpacity>
        ) : (
          <>
            <Image source={WelcomeSign} style={styles.WelcomeSign} />
            <View style={{ marginTop: 20 }}>
              <Button
                disable={!!btnClicked}
                background="Gold"
                text="Sign in"
                onPress={() => handleClick('Login')}
              />
              {/* did not delete maybe we re use it soon */}
              {/* {btnClicked !== 'GoogleSignIn' ? (
                <Button
                  disable={!!btnClicked}
                  background="Google"
                  text="Sign in with Google"
                  onPress={() => handleClick('GoogleSignIn')}
                />
              ) : (
                <Button
                  disable={!!btnClicked}
                  background="GoogleButtonBroken"
                  onPress={() => handleClick(undefined)}
                />
              )} */}
              <Text type="bold">OR</Text>
              <Button
                disable={!!btnClicked}
                background="Green"
                text="Create account"
                onPress={() => handleClick('SignUp')}
              />
            </View>
            <FormModal
              component={component}
              onEmit={() => handleClick(undefined)}
              text={text}
            />
            <Image source={Tiger} style={styles.tiger} />
          </>
        )}
      </SafeAreaView>
    </>
  );
}
