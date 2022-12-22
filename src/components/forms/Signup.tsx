import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});

export const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text type="header">This is a header</Text>
    </View>
  );
};
