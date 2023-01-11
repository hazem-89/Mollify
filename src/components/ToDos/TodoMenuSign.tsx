import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import TodoMenuHeaderImage from '../../../assets/images/TodoMenuHeaderImage.png';
import { Text } from '../Text';

type TodoMenuHeaderProps = {
  text: string;
};

export const TodoMenuHeader = ({ text }: TodoMenuHeaderProps) => {
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    background: {
      width: smallScreen ? 300 : 450,
      height: smallScreen ? 110 : 150,
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      zIndex: 10,
    },
  });
  return (
    <ImageBackground style={styles.background} source={TodoMenuHeaderImage}>
      <Text type="header">{text}</Text>
    </ImageBackground>
  );
};
