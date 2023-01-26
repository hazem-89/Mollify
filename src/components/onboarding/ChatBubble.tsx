import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type TextProps = {
  children: React.ReactNode;
  orientation: 'right' | 'left';
};

export default function ChatBubble({ children, orientation }: TextProps) {
  const styles = StyleSheet.create({
    chatBubbleContainer: {
      width: 200,
      height: 200,
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      // position: 'absolute',
      backgroundColor: '#D9D9D9',
      borderRadius: 20,
      padding: 20,
      zIndex: 1,
    },
  });
  return (
    <View style={styles.chatBubbleContainer}>
      {children && <View style={styles.text}>{children}</View>}
      <Svg
        style={{ top: -1 }}
        width="100%"
        height="100%"
        viewBox={orientation === 'right' ? '30 0 100 400' : '0 0 10 300'}
        fill="none"
      >
        {orientation === 'right' ? (
          <Path
            d="M151 0C118.926 28.3333 43.8212 85 0 85C61.1498 51.8333 75.1876 14.5139 74.5628 0H151Z"
            fill="#D9D9D9"
          />
        ) : (
          <Path
            d="M0 0C32.0745 28.3333 107.179 85 151 85C89.8502 51.8333 75.8124 14.5139 76.4372 0H0Z"
            fill="#D9D9D9"
          />
        )}
      </Svg>
    </View>
  );
}
