import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import MainBackGround from '../../assets/Images/MainBackGround.png';
import Tiger from '../../assets/Images/tiger-min.png';
import WelcomeSign from '../../assets/Images/WelcomeSign.png';
import Button from '../components/buttons/Buttons';
import { LoginForm } from '../components/forms/Login';
import { SignUpForm } from '../components/forms/Signup';
import SelectProfile from '../components/menu/SelectProfile';

import FormModal from '../components/modals/FormModal';
import { Text } from '../components/Text';
import { useLogin } from '../util/auth';

export default function StartScreen() {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [component, setComponent] = useState<ReactElement | undefined>();
  const { currentUser, logout } = useLogin();
  const [text, setText] = useState<string | undefined>();

  const styles = StyleSheet.create({
    WelcomeSign: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: smallScreen ? 350 : 450,
      height: smallScreen ? 100 : 140,
      top: smallScreen ? 10 : 20,
      marginBottom: 10,
      zIndex: 5,
    },
    Background: {
      position: 'relative',
      width: '100%',
      height: '100%',
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
      alignItems: 'center',
      zIndex: 1,
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
        <Image source={WelcomeSign} style={styles.WelcomeSign} />
        {currentUser ? (
          <>
            <View style={{ position: 'absolute', top: 50, left: 50 }}>
              <Button background="Close" onPress={logout} />
            </View>
            <SelectProfile />
          </>
        ) : (
          <>
            <View>
              <Button
                disable={!!btnClicked}
                background="Gold"
                text="Sign in"
                onPress={() => handleClick('Login')}
              />
              {btnClicked !== 'GoogleSignIn' ? (
                <Button
                  disable={!!btnClicked}
                  background="Google"
                  text="sign in with Google"
                  onPress={() => handleClick('GoogleSignIn')}
                />
              ) : (
                <Button
                  disable={!!btnClicked}
                  background="GoogleButtonBroken"
                  onPress={() => handleClick(undefined)}
                />
              )}
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
