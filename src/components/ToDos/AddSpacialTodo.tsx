import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';

export const AddSpacialTodo = () => {
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: smallScreen ? 400 : 550,
      minWidth: smallScreen ? 550 : 750,
    },
  });

  return (
    <View style={styles.container}>
      <Text>AddSpacialTodo</Text>
    </View>
  );
};
