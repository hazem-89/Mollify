import React from 'react';
import { StyleSheet, View } from 'react-native';

type TextProps = {
  children: React.ReactNode;
  orientation: 'right' | 'left';
};

export default function ChatBubble({ children, orientation }: TextProps) {
  const styles = StyleSheet.create({
    chatBubbleContainer: {
      width: '25%',
      height: '30%',
    },
    chatBubble: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    text: {
      padding: 5,
      zIndex: 1,
    },
  });
  return (
    <View style={styles.chatBubbleContainer}>
      {children && <View style={styles.text}>{children}</View>}
      <svg
        style={styles.chatBubble}
        viewBox="0 0 940 602"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 37.6363C0 16.8503 16.8261 0 37.5821 0H902.418C923.174 0 940 16.8503 940 37.6363V440.434C940 461.22 923.174 478.071 902.418 478.071H37.5821C16.8261 478.071 0 461.22 0 440.434V37.6363Z"
          fill="#D9D9D9"
        />
        {orientation === 'right' ? (
          <path
            d="M32.8847 595.012C79.9518 571.534 111.255 504.282 121.024 473.59C183.511 470.006 305.713 466.511 294.617 481.207C230.414 583.363 -14.1824 618.49 32.8847 595.012Z"
            fill="#D9D9D9"
          />
        ) : (
          <path
            d="M907.115 595.012C860.048 571.534 828.745 504.282 818.976 473.59C756.489 470.006 634.287 466.511 645.383 481.207C709.586 583.363 954.182 618.49 907.115 595.012Z"
            fill="#D9D9D9"
          />
        )}
      </svg>
    </View>
  );
}
