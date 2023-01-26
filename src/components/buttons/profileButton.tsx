import { useDimensions } from '@react-native-community/hooks';
import { DocumentData } from 'firebase/firestore';
import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
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

  const styles = StyleSheet.create({
    Avatar: {
      width: smallScreen ? 70 : 100,
      height: smallScreen ? 70 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#067B7B',
      borderRadius: 500,
    },
    profile: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginLeft: 10,
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

  useEffect(() => {
    console.log(profileImage);
  }, [profileImage]);

  return (
    <TouchableOpacity key={profile?.id} onPress={() => onpress()}>
      <View style={styles.profile}>
        <View style={styles.Avatar}>
          <Image
            source={profileImage}
            style={{
              width: smallScreen ? 50 : 75,
              height: smallScreen ? 50 : 75,
            }}
          />
        </View>
        <Text type="text">{profile?.name.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}
