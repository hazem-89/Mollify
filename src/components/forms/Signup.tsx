import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    width: 300,
    height: 300,
  },
});

export const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text>This is a SignUp</Text>
    </View>
  );
};
