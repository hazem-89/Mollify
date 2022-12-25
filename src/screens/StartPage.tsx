import React, { useEffect, useState } from 'react';
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
import { useDimensions } from '@react-native-community/hooks';
import { SignUp } from '../components/forms/Signup';
import StartPageButtons from '../components/buttons/StartPageButtons';

export const StartPage = () => {
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [signUpMenuOpen, setSignUpMenuOpen] = useState(false);

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
      width: smallScreen ? 250 : 450,
      height: smallScreen ? 75 : 150,
      marginTop: 30,
    },
    buttonsContainer: {
      marginTop: smallScreen ? 10 : 20,
    },
    backGroundImage: {
      width: '100%',
      height: '100%',
    },
    GreenButtonImage: {
      justifyContent: 'center',
      width: smallScreen ? 200 : 250,
      height: smallScreen ? 40 : 50,
      alignSelf: 'center',
    },
    GoogleButton: {
      justifyContent: 'center',
      width: smallScreen ? 200 : 250,
      height: smallScreen ? 40 : 60,
      alignSelf: 'center',
      marginTop: 20,
    },
    GoldenButtonImg: {
      justifyContent: 'center',
      width: 150,
      height: 45,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    menuContainer: {
      // width: 500,
      // height: 400,
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      top: '10%',
      flex: 1,
      backgroundColor: 'tomato',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={MainBackGround} style={styles.backGroundImage}>
        <View>
          <Image source={WelcomeSign} style={styles.WelcomeSign} />
          <>
            <StartPageButtons />
          </>
        </View>
        {signUpMenuOpen ? (
          <View style={styles.menuContainer}>
            <SignUp />
          </View>
        ) : null}
      </ImageBackground>
    </SafeAreaView>
  );
};
