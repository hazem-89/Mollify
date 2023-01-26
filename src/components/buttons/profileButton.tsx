import { useDimensions } from '@react-native-community/hooks';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { avatars } from '../../util/itemObjects';
import { Text } from '../Text';

type ProfileButtonProps = {
  onpress: Function;
  profile: DocumentData;
};

export default function ProfileButton({
  onpress,
  profile,
}: ProfileButtonProps) {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [color, setColor] = useState<string>();
  const colorOptions = [
    '#067B7B',
    '#087b06',
    '#647b06',
    '#7b1a06',
    '#12067b',
    '#7b063b',
    '#06467b',
    '#067b5a',
    '#7b067b',
    '#587b06',
    '#F44336',
    '#9C27B0',
    '#b5783f',
    '#a54caf',
    '#ff0707',
    '#3fb54f',
    '#4c7caf',
    '#07fbff',
    '#3F51B5',
    '#4CAF50',
    '#FFC107',
  ];

  useEffect(() => {
    setColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
  }, []);

  const styles = StyleSheet.create({
    avatar: {
      width: smallScreen ? 70 : 100,
      height: smallScreen ? 70 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderRadius: 500,
      marginRight: 10,
      overflow: 'hidden',
    },
  });

  const profileImage = useMemo(() => {
    let image;
    avatars.filter(avatar => {
      if (avatar.id === profile.avatar) {
        image = avatar.image;
      }
    });
    return image;
  }, [avatars, profile.avatar]);

  return (
    <TouchableOpacity key={profile.id} onPress={() => onpress()}>
      <View style={styles.avatar}>
        <Image
          resizeMode="cover"
          source={profileImage}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <Text type="text">{profile.name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}
