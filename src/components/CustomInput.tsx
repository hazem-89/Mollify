import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';
import { useDimensions } from '@react-native-community/hooks';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorText?: string;
}

export const TextInput = ({
  label = '',
  errorText = '',
  ...rest
}: TextInputProps) => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const styles = StyleSheet.create({
    inputContainer: {
      justifyContent: 'center',
      maxHeight: smallScreen ? 20 : 30,
      marginTop: smallScreen ? 20 : 30,
      borderBottomColor: colors.primary,
      borderBottomWidth: 1,
      width: smallScreen ? 200 : 250,
      alignItems: 'flex-start',
    },
    labelText: {
      color: colors.gray,
      fontSize: smallScreen ? 12 : 18,
    },
    textInput: {
      fontSize: smallScreen ? 10 : 14,
      fontWeight: '500',
    },
    border: {
      height: 1,
      backgroundColor: colors.border,
    },
    borderError: {
      backgroundColor: colors.error,
    },
    errorText: {
      marginTop: 5,
      color: colors.error,
      fontSize: smallScreen ? 10 : 12,
    },
  });
  const borderStyles: StyleProp<ViewStyle> = [styles.border];

  if (errorText && errorText.length > 0) {
    borderStyles.push(styles.borderError);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.labelText]}>{label}</Text>
      <RNTextInput style={styles.textInput} {...rest} />
      <View style={borderStyles} />
      <Text style={[styles.errorText]}>{errorText}</Text>
    </View>
  );
};
