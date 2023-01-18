import { useEffect, useRef, useState } from 'react';
import React, { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Animated,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function LoadingScreen() {
  const [showButton, setShowButton] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const timeoutIdRef = useRef<any>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    button: {
      backgroundColor: '#ff6a00',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      opacity: showButton ? 1 : 0,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      opacity: showButton ? 1 : 0,
    },
  });

  useEffect(() => {
    if (isFocused) {
      timeoutIdRef.current = setTimeout(() => {
        setShowButton(true);
      }, 3000);
    } else {
      clearTimeout(timeoutIdRef.current);
    }
    if (showButton) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused, showButton]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="#ff6a00" />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.buttonText}>
          This is taking longer than expected
        </Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowButton(false);
              // @ts-ignore
              navigation.navigate('StartScreen');
            }}
          >
            <Text style={styles.buttonText}>Go home</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
