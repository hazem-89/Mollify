import { useDimensions } from '@react-native-community/hooks';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '../components/Text';

type CarouselProps = {
  onEmit: Function;
  title: string;
  data: any[];
};

export default function Carousel({ title, data, onEmit }: CarouselProps) {
  const [selectedItem, setSelectedItem] = useState();
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    CarouselContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 0.6 * ScreenWidth,
      paddingRight: 60,
    },
    slide: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
    },
    image: {
      width: 0.1 * ScreenWidth,
      height: 0.1 * ScreenWidth,
      maxWidth: 200,
      maxHeight: 200,
      borderRadius: 200,
    },
    selectedImage: {
      width: 0.12 * ScreenWidth,
      height: 0.12 * ScreenWidth,
      borderRadius: 200,
      borderWidth: 3,
      borderColor: '#97E491',
    },
    RoomImage: {
      width: 0.25 * ScreenWidth,
      height: 0.13 * ScreenWidth,
      borderRadius: 10,
    },
    RoomSelectedImage: {
      width: 0.22 * ScreenWidth,
      height: 0.16 * ScreenWidth,
      borderRadius: 5,
      borderWidth: 3,
      borderColor: '#97E491',
    },
  });

  return (
    <View style={styles.CarouselContainer}>
      {title && <Text type="rewardDetails">{title}</Text>}
      <FlatList
        data={data}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.slide}
              onPress={() => {
                setSelectedItem(item.id);
                onEmit(item.id);
              }}
            >
              {item.image && item.id === selectedItem ? (
                <Image
                  style={
                    title === 'Choose avatar'
                      ? styles.selectedImage
                      : styles.RoomSelectedImage
                  }
                  source={item.image}
                />
              ) : (
                <Image
                  style={
                    title === 'Choose avatar' ? styles.image : styles.RoomImage
                  }
                  source={item.image}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
