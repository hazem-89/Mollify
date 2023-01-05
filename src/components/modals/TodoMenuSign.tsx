import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from '../../components/Text';
import TodoMenuHeaderImage from '../../../assets/Images/TodoMenuHeaderImage.png';
import { useDimensions } from '@react-native-community/hooks';

type TodoMenuHeaderProps = {
  text: string;
};

export const TodoMenuHeader = ({ text }: TodoMenuHeaderProps) => {
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const styles = StyleSheet.create({
    background: {
      width: smallScreen ? 300 : 450,
      height: smallScreen ? 110 : 150,
      alignContent: 'center',
      justifyContent: 'center',
      // position: 'absolute',
      // top: smallScreen ? -10 : -100,
      alignSelf: 'center',
      zIndex: 100,
    },
  });
  return (
    <View>
      <ImageBackground style={styles.background} source={TodoMenuHeaderImage}>
        <Text type="header">{text}</Text>
      </ImageBackground>
    </View>
  );
};
