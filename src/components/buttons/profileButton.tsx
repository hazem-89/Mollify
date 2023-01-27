import { useDimensions } from '@react-native-community/hooks';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { avatars, randomColorOptions } from '../../util/itemObjects';
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

  useEffect(() => {
    setColor(
      randomColorOptions[Math.floor(Math.random() * randomColorOptions.length)],
    );
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
