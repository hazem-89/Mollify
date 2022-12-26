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
import { SignUp } from '../components/forms/SignUp';
import StartPageButtons from '../components/buttons/Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParams } from '../navigation/Main';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/buttons/Buttons';
import { Text } from '../components/Text';

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'StartPage'>;
};
export const StartPage: React.FC<Props> = ({ navigation }: Props) => {
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [signUpMenuOpen, setSignUpMenuOpen] = useState(false);
  const handleMenu = () => {
    signUpMenuOpen ? setSignUpMenuOpen(false) : setSignUpMenuOpen(true);
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
      width: smallScreen ? 250 : 450,
      height: smallScreen ? 75 : 150,
      marginTop: 30,
    },
    backGroundImage: {
      width: '100%',
      height: '100%',
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
    tiger: {
      position: 'absolute',
      bottom: 0,
      left: smallScreen ? '15%' : '20%',
      flex: 1,
      height: 180,
      width: 130,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={MainBackGround} style={styles.backGroundImage}>
        <View>
          <Image source={WelcomeSign} style={styles.WelcomeSign} />
          <Button
            background="Gold"
            text="Click me"
            onPress={handleMenu}
            type="Gold"
          />
          <Button
            background="Google"
            text="sign in with Google"
            onPress={handleMenu}
            type="Google"
          />
          <Text type="bold">OR</Text>
          <Button
            background="Green"
            text="Create account"
            onPress={handleMenu}
            type="Green"
          />
        </View>
        {signUpMenuOpen ? (
          <View style={styles.menuContainer}>
            <SignUp />
          </View>
        ) : null}
      </ImageBackground>
      <Image source={Tiger} style={styles.tiger} />
    </SafeAreaView>
  );
};
