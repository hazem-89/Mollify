import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Text } from '../Text';
import colors from '../../constants/colors';
import { useDimensions } from '@react-native-community/hooks';
import GreenButtonImage from '../../../assets/Images/GreenButton.png';
import GoldenButton from '../../../assets/Images/GoldenButton.png';
import GoogleButton from '../../../assets/Images/GoogleButton.png';

function startPageButtons() {
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const handleMenu = () => {
    // signUpMenuOpen ? setSignUpMenuOpen(false) : setSignUpMenuOpen(true);
  };
  const styles = StyleSheet.create({
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
    <View>
      <View style={styles.buttonsContainer}>
        <ImageBackground source={GoldenButton} style={styles.GoldenButtonImg}>
          <TouchableOpacity
            onPress={() => Alert.alert('you pressed the text button')}
          >
            <Text type="confirmButton">Sign in</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground source={GoogleButton} style={styles.GoogleButton}>
          <TouchableOpacity
            onPress={() => Alert.alert('you pressed the text button')}
          >
            <Text type="confirmButton">Sign in With Google</Text>
          </TouchableOpacity>
        </ImageBackground>
        <Text type="bold">OR</Text>
        <ImageBackground
          source={GreenButtonImage}
          style={styles.GreenButtonImage}
        >
          <TouchableOpacity onPress={handleMenu}>
            <Text type="confirmButton">Create account</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

export default startPageButtons;
