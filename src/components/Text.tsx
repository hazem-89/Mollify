import React, { useState } from 'react';
import { StyleSheet, Text as RNText, StyleProp, TextStyle } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import colors from '../constants/colors';
import { useFonts } from 'expo-font';

type TextProps = {
  type?: 'header' | 'subheader' | 'confirmButton' | 'bold';
  children: string;
  style?: StyleProp<TextStyle>[];
};

export const Text = ({ type, children, style = [] }: TextProps) => {
  const [fontsLoaded] = useFonts({
    Inika: require('../../assets/fonts/Inika/Inika-Regular.ttf'),
  });

  const [smallScreen, setSmallScreen] = useState(
    useDimensions().screen.height < 600 ? true : false,
  );
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
    confirmButtonText: {
      fontWeight: '400',
      shadowColor: 'rgba(99, 99, 99, 1)',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      // shadowRadius: 15,
      fontSize: smallScreen ? 10 : 15,
      marginHorizontal: 50,
      alignSelf: 'center',
      // fontFamily: Inika,
    },
    bold: {
      fontWeight: '900',
      justifyContent: 'center',
      alignSelf: 'center',
      marginVertical: 20,
      fontSize: 25,
    },
  });

  let textStyles: StyleProp<TextStyle>[] = [styles.text];

  if (type === 'header') {
    textStyles.push(styles.headerText);
  } else if (type === 'subheader') {
    textStyles.push(styles.subHeaderText);
  } else if (type === 'confirmButton') {
    textStyles.push(styles.confirmButtonText);
  } else if (type === 'bold') {
    textStyles.push(styles.bold);
  }

  textStyles = [...textStyles, ...style];

  return <RNText style={textStyles}>{children}</RNText>;
};
