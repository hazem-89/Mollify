import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground, ImageSourcePropType, StyleSheet, TouchableOpacity
} from 'react-native';
import Close from '../../../assets/Images/Close.png';
import GoldenButton from '../../../assets/Images/GoldenButton.png';
import GoogleButtonBroken from '../../../assets/Images/GoogleButtonBroken.png';
import GoogleButton from '../../../assets/Images/GoogleButtonWithIcon.png';
import GreenButtonImage from '../../../assets/Images/GreenButton.png';
import { Text } from '../Text';

type ButtonProps = {
  onPress: () => void;
  text?: string;
  background: string;
  disable?: boolean;
};

function Button({
  onPress = Function,
  text = '',
  background = '',
  disable = false,
}: ButtonProps) {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [source, setSource] = useState<ImageSourcePropType | undefined>(
    undefined,
  );
  const [style, setStyle] = useState<Object>({});

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
    Close: {
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
    } else if (background === 'Close') {
      setSource(Close);
      setStyle(styles.Close);
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
    <TouchableOpacity activeOpacity={disable ? 1 : 0.2} onPress={onPress}>
      <ImageBackground source={source} style={style}>
        <Text type={background}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Button;
