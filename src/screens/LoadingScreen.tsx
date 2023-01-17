import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="#ff6a00" />
    </View>
  );
}
