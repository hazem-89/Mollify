import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
} from 'react-native';
import { Text } from '../Text';
import colors from '../../constants/colors';
import { useDimensions } from '@react-native-community/hooks';
import GreenButtonImage from '../../../assets/Images/GreenButton.png';
import GoldenButton from '../../../assets/Images/GoldenButton.png';
import GoogleButton from '../../../assets/Images/GoogleButtonWithIcon.png';
import GoogleButtonBroken from '../../../assets/Images/GoogleButtonBroken.png';
import CancelButton from '../../../assets/Images/CancelButton.png';

type ButtonProps = {
  onPress: () => void;
  text?: string;
  background: string;
  type: string;
};

function Button({
  onPress = () => {},
  text = '',
  background = '',
  type = '',
}: ButtonProps) {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [source, setSource] = useState<ImageSourcePropType | undefined>(
    undefined,
  );
  const [style, setStyle] = useState<Object>({});
  const handleMenu = () => {
    // signUpMenuOpen ? setSignUpMenuOpen(false) : setSignUpMenuOpen(true);
  };
  const styles = StyleSheet.create({
    Green: {
      justifyContent: 'center',
      width: smallScreen ? 200 : 250,
      height: smallScreen ? 40 : 50,
      alignSelf: 'center',
    },
    GreenForms: {
      justifyContent: 'center',
      width: smallScreen ? 120 : 150,
      height: smallScreen ? 25 : 35,
      alignSelf: 'center',
      marginTop: 30,
    },
    Google: {
      justifyContent: 'center',
      width: smallScreen ? 200 : 300,
      height: smallScreen ? 40 : 70,
      alignSelf: 'center',
      marginTop: 20,
    },
    Gold: {
      justifyContent: 'center',
      width: smallScreen ? 150 : 200,
      height: smallScreen ? 45 : 55,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    CancelButton: {
      width: smallScreen ? 35 : 55,
      height: smallScreen ? 35 : 55,
    },
  });

  useEffect(() => {
    if (background === 'Gold') {
      setSource(GoldenButton);
      setStyle(styles.Gold);
    } else if (background === 'Green') {
      setSource(GreenButtonImage);
      setStyle(styles.Green);
    } else if (background === 'Google') {
      setSource(GoogleButton);
      setStyle(styles.Google);
    } else if (background === 'CancelButton') {
      setSource(CancelButton);
      setStyle(styles.CancelButton);
    } else if (background === 'GreenForms') {
      setSource(GreenButtonImage);
      setStyle(styles.GreenForms);
    } else if (background === 'GoogleButtonBroken') {
      setSource(GoogleButtonBroken);
      setStyle(styles.Google);
    }
  }, [background]);

  // const imageBackgroundStyles: StyleProp[] = [styles.GreenButtonImage];
  return (
    <ImageBackground source={source} style={style}>
      <TouchableOpacity onPress={onPress}>
        <Text type={background}>{text}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default Button;
