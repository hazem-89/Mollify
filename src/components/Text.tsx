import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text as RNText,
  StyleProp,
  TextStyle,
  Dimensions,
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import colors from '../constants/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

type TextProps = {
  type?: string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>[];
};

export const Text = ({ type, children, style = [] }: TextProps) => {
  SplashScreen.preventAutoHideAsync();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const ScreenHeight = Dimensions.get('window').height;
  const [fontsLoaded] = useFonts({
    Inika: require('../../assets/fonts/Inika/Inika-Regular.ttf'),
    DigitalNumbers: require('../../assets/fonts/DigitalNum/DigitalNumbers-Regular.ttf'),
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
    smallText: {
      fontSize: smallScreen ? 14 : 16,
      color: 'rgba(0,0,0,.6)',
      fontFamily: 'Inika',
      textAlign: 'center',
    },

    headerText: {
      fontWeight: '600',
      fontSize: smallScreen ? 20 : 30,
      fontFamily: 'Inika',
      color: 'rgba(0,0,0, .7)',
      textAlign: 'center',
    },

    subHeaderText: {
      color: colors.gray,
      marginBottom: 12,
      marginTop: -12, // assum this shows up under a headerText
    },

    Gold: {
      fontSize: 0.08 * ScreenHeight,
      alignSelf: 'center',
      fontFamily: 'Inika',
      color: 'rgba(136, 80, 0, 1)',
      textAlign: 'center',
      marginBottom: 10,
    },

    Green: {
      fontSize: 0.05 * ScreenHeight,
      alignSelf: 'center',
      fontFamily: 'Inika',
      color: '#0F6209',
      width: '100%',
      textAlign: 'center',
      marginBottom: 10,
    },
    GreenForms: {
      fontSize: smallScreen ? 15 : 20,
      alignSelf: 'center',
      fontFamily: 'Inika',
      color: '#0F6209',
      width: '100%',
      textAlign: 'center',
      marginBottom: 10,
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
    todoList: {
      fontWeight: '400',
      fontSize: smallScreen ? 12 : 14,
      fontFamily: 'Inika',
      color: 'rgba(0,0,0,.4)',
      textAlign: 'left',
    },
    errorText: {
      color: colors.error,
      fontSize: smallScreen ? 10 : 12,
    },
    Cancel: {
      color: '#fff',
      fontSize: smallScreen ? 20 : 20,
      textAlign: 'center',
      marginBottom: 10,
    },
    MenuTitle: {
      fontSize: smallScreen ? 20 : 30,
    },
    DigitalNum: {
      minWidth: 100,
      fontFamily: 'DigitalNumbers',
      textAlign: 'center',
      fontSize: smallScreen ? 14 : 18,
      color: '#fff',
    },
    CountDownDays: {
      minWidth: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: smallScreen ? 20 : 25,
      color: '#fff',
    },
    categoryTitles: {
      fontWeight: '600',
      fontSize: smallScreen ? 18 : 25,
      fontFamily: 'Inika',
      color: 'rgba(0,0,0, .5)',
      textAlign: 'center',
      maxWidth: smallScreen ? 100 : 150,
    },
    NotificationNum: {
      fontSize: smallScreen ? 14 : 18,
      fontWeight: 'bold',
    },
    rewardHeader: {
      fontSize: smallScreen ? 40 : 50,
      fontFamily: 'Inika',
      color: '#fff',
    },
    rewardDetails: {
      fontSize: smallScreen ? 20 : 25,
      fontFamily: 'Inika',
      color: '#fff',
    },
    disable: {
      fontSize: smallScreen ? 20 : 25,
      fontFamily: 'Inika',
      color: 'rgba(255, 255, 255, .5)',
      textAlign: 'center',
      marginBottom: 10,
    },
    aboutText: {
      fontSize: smallScreen ? 15 : 22,
      fontFamily: 'Inika',
      color: '#fff',
      textAlign: 'center',
    },
  });

  let textStyles: StyleProp<TextStyle>[] = [styles.smallText];

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
  } else if (type === 'todoList') {
    textStyles.push(styles.todoList);
  } else if (type === 'errorText') {
    textStyles.push(styles.errorText);
  } else if (type === 'Cancel') {
    textStyles.push(styles.Cancel);
  } else if (type === 'MenuTitle') {
    textStyles.push(styles.MenuTitle);
  } else if (type === 'DigitalNum') {
    textStyles.push(styles.DigitalNum);
  } else if (type === 'CountDownDays') {
    textStyles.push(styles.CountDownDays);
  } else if (type === 'categoryTitles') {
    textStyles.push(styles.categoryTitles);
  } else if (type === 'NotificationNum') {
    textStyles.push(styles.NotificationNum);
  } else if (type === 'rewardHeader') {
    textStyles.push(styles.rewardHeader);
  } else if (type === 'rewardDetails') {
    textStyles.push(styles.rewardDetails);
  } else if (type === 'disable') {
    textStyles.push(styles.disable);
  } else if (type === 'text') {
    textStyles.push(styles.smallText);
  } else if (type === 'aboutText') {
    textStyles.push(styles.aboutText);
  }

  textStyles = [...textStyles, ...style];

  return (
    <RNText onLayout={onLayoutRootView} style={textStyles}>
      {children}
    </RNText>
  );
};

