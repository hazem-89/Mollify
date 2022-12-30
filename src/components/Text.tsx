import React, { useCallback, useState } from 'react';
import { StyleSheet, Text as RNText, StyleProp, TextStyle } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import colors from '../constants/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

type TextProps = {
  type?: string;
  children: string;
  style?: StyleProp<TextStyle>[];
};

export const Text = ({ type, children, style = [] }: TextProps) => {
  SplashScreen.preventAutoHideAsync();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [fontsLoaded] = useFonts({
    Inika: require('../../assets/fonts/Inika/Inika-Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const styles = StyleSheet.create({
    text: {
      color: colors.primary,
      fontSize: 16,
    },

    headerText: {
      fontWeight: '600',
      fontSize: 32,
      marginBottom: 12,
    },

    subHeaderText: {
      color: colors.gray,
      marginBottom: 12,
      marginTop: -12, // assum this shows up under a headerText
    },

    Gold: {
      shadowColor: '#636363',
      shadowOffset: {
        width: 20,
        height: 10,
      },
      shadowOpacity: 0.5,
      fontSize: smallScreen ? 30 : 35,
      alignSelf: 'center',
      fontFamily: 'Inika',
      color: 'rgba(136, 80, 0, 1)',
      textAlign: 'center',
    },

    Green: {
      fontSize: smallScreen ? 25 : 30,
      alignSelf: 'center',
      fontFamily: 'Inika',
      color: '#0F6209',
      width: '100%',
      textAlign: 'center',
    },
    GreenForms: {
      fontSize: smallScreen ? 10 : 15,
      alignSelf: 'center',
      fontFamily: 'Inika',
      color: '#0F6209',
      width: '100%',
      textAlign: 'center',
    },

    Google: {
      fontSize: smallScreen ? 19 : 23,
      fontFamily: 'Inika',
      color: '#1F7698',
      textAlign: 'left',
      paddingLeft: 10,
    },

    bold: {
      fontWeight: '900',
      justifyContent: 'center',
      alignSelf: 'center',
      marginVertical: smallScreen ? 10 : 20,
      fontSize: 30,
      fontFamily: 'Inika',
    },
    formText: {
      fontWeight: '900',
      marginTop: 20,
      fontSize: smallScreen ? 15 : 18,
      fontFamily: 'Inika',
      color: 'rgba(0,0,0,.4)',
    },
  });

  let textStyles: StyleProp<TextStyle>[] = [styles.text];

  if (type === 'header') {
    textStyles.push(styles.headerText);
  } else if (type === 'subheader') {
    textStyles.push(styles.subHeaderText);
  } else if (type === 'Green') {
    textStyles.push(styles.Green);
  } else if (type === 'bold') {
    textStyles.push(styles.bold);
  } else if (type === 'Google' || type === 'GoogleButtonBroken') {
    textStyles.push(styles.Google);
  } else if (type === 'Gold') {
    textStyles.push(styles.Gold);
  } else if (type === 'GreenForms') {
    textStyles.push(styles.GreenForms);
  } else if (type === 'formText') {
    textStyles.push(styles.formText);
  }

  textStyles = [...textStyles, ...style];

  return (
    <RNText onLayout={onLayoutRootView} style={textStyles}>
      {children}
    </RNText>
  );
};
