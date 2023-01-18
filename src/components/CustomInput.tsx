import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextInputProps as RNTextInputProps,
  Dimensions,
} from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';
import { useDimensions } from '@react-native-community/hooks';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorText?: string | undefined;
  impStyle?: object;
}

export const TextInput = ({
  label = '',
  errorText = '',
  impStyle,
  ...rest
}: TextInputProps) => {
  const dimensions = useDimensions();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const styles = StyleSheet.create({
    inputContainer: {
      justifyContent: 'center',
      maxHeight: smallScreen ? 20 : 30,
      marginTop: smallScreen ? 20 : 30,
      borderBottomColor: colors.primary,
      borderBottomWidth: 1,
      minWidth: smallScreen ? 200 : 400,
    },
    labelText: {
      color: 'black',
      fontSize: smallScreen ? 14 : 18,
    },
    textInput: {
      fontSize: smallScreen ? 10 : 14,
      fontWeight: '500',
      minWidth: smallScreen ? 200 : 300,
      color: 'black',
    },
    border: {
      height: 1,
      backgroundColor: 'black',
    },
    borderError: {
      backgroundColor: colors.error,
    },
    errorsView: {
      // backgroundColor: 'rgba(255, 255, 255, .7)',
      // width: 0.15 * ScreenWidth,
      // padding: 5,
      // alignItems: 'center',
      // borderRadius: 25,
      // position: 'absolute',
      // bottom: -0.1 * ScreenHeight,
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
    <View style={impStyle}>
      {/* <Text style={[styles.labelText]}>{label}</Text> */}
      <RNTextInput style={styles.textInput} {...rest} />
      <View style={borderStyles} />
      {errorText && (
        <View style={styles.errorsView}>
          <Text style={[styles.errorText]}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};
