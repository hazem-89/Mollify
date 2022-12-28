import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import colors from '../constants/colors';
import MainBackGround from '../../assets/Images/MainBackGround.png';
import WelcomeSign from '../../assets/Images/WelcomeSign.png';
import Tiger from '../../assets/Images/tiger-min.png';
import { useDimensions } from '@react-native-community/hooks';
import { SignUpForm } from '../components/forms/Signup';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParams } from '../navigation/Main';
import Button from '../components/buttons/Buttons';
import { Text } from '../components/Text';

import { auth, db } from '../../firebaseConfig';

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'StartPage'>;
};
export const StartPage: React.FC<Props> = ({ navigation }: Props) => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [signUpMenuOpen, setSignUpMenuOpen] = useState(false);
  const [googleBtnPressed, setGoogleBtnPressed] = useState(false);
  const handleMenu = () => {
    signUpMenuOpen ? setSignUpMenuOpen(false) : setSignUpMenuOpen(true);
  };

  const handleGoogleBtnClick = () => {
    setGoogleBtnPressed(true);
  };
  const handleGoogleBtnClick1 = () => {
    setGoogleBtnPressed(false);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      width: '100%',
      height: '100%',
    },
    WelcomeSign: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: smallScreen ? 350 : 450,
      height: smallScreen ? 100 : 150,
      marginTop: 30,
      zIndex: 10,
    },
    backGroundImage: {
      width: '100%',
      height: '100%',
    },
    menuContainer: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      top: '25%',
      flex: 1,
    },
    tiger: {
      position: 'absolute',
      bottom: 0,
      left: smallScreen ? '15%' : '20%',
      flex: 1,
      height: 180,
      width: 130,
    },
    CancelButton: {
      position: 'absolute',
    },
    GoogleIcon: {
      position: 'absolute',
      width: 50,
      height: 50,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={MainBackGround} style={styles.backGroundImage}>
        <Image source={WelcomeSign} style={styles.WelcomeSign} />
        {!signUpMenuOpen ? (
          <View>
            <Button
              background="Gold"
              text="Sign in"
              onPress={handleMenu}
              type="Gold"
            />
            {!googleBtnPressed ? (
              <Button
                background="Google"
                text={'sign in with Google'}
                onPress={handleGoogleBtnClick}
                type="Google"
              />
            ) : (
              <Button
                background="GoogleButtonBroken"
                onPress={handleGoogleBtnClick1}
                type="Google"
              />
            )}

            <Text type="bold">OR</Text>
            <Button
              background="Green"
              text="Create account"
              onPress={handleMenu}
              type="Green"
            />
          </View>
        ) : null}

        {signUpMenuOpen ? (
          <View style={styles.menuContainer}>
            <SignUpForm
              signUpMenuOpen={signUpMenuOpen}
              setSignUpMenuOpen={setSignUpMenuOpen}
            />
          </View>
        ) : null}
      </ImageBackground>
      {signUpMenuOpen ? null : <Image source={Tiger} style={styles.tiger} />}
    </SafeAreaView>
  );
};
