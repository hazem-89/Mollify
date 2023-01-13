import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

type DisposalProps = {
  onEmit?: Function;
  image?: ImageSourcePropType;
  show: boolean;
};

export default function Disposal({ onEmit, image, show }: DisposalProps) {
  const translateX = new Animated.Value(1000); // Initial value for translateX
  const ScreenHeight = Dimensions.get('window').height;
  const ScreenWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    modal: {
      height: ScreenHeight,
      flex: 1,
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      zIndex: 0,
    },
    animated: {
      width: ScreenWidth * 0.3,
      height: '65%',
      backgroundColor: 'red',
    },
  });

  useEffect(() => {
    if (show) {
      // Animate slide in.
      Animated.timing(translateX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else if (!show) {
      // Animate slide out not working but removing this breaks things.
      Animated.timing(translateX, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).stop();
    }
  }, [show]);

  return (
    <>
      <View style={styles.modal}>
        <Animated.View
          style={[styles.animated, { transform: [{ translateX }] }]}
        >
          {/* <Image
          style={styles.formBackground}
          resizeMode="stretch"
          source={image}
        /> */}
        </Animated.View>
      </View>
    </>
  );
}
