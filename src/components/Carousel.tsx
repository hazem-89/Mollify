import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


type CarouselProps = {
    onEmit: Function;
    titel: string;
    data: any[];
};

export default function Carousel({ titel, data, onEmit }: CarouselProps) {
    const dimensions = useDimensions();
    const [selectedItem, setSelectedItem] = useState()

    const styles = StyleSheet.create({
        CarouselContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
        },
        slide: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
        },
        image: {
            maxWidth: 200,
            maxHeight: 200,
            borderRadius: 200,
        },
        selectedImage: {
            maxWidth: 200,
            maxHeight: 200,
            borderRadius: 200,
            borderWidth: 3,
            borderColor: "#97E491",
        }
    });

    return (
        <View style={styles.CarouselContainer}>
            {titel && <Text>{titel}</Text>}
            <FlatList
                data={data}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                    <View >
                        <TouchableOpacity style={styles.slide} onPress={() => { setSelectedItem(item.id); onEmit(item.id) }}>
                            {item.image &&
                                item.id === selectedItem ?
                                <Image style={styles.selectedImage} source={item.image} /> :
                                <Image style={styles.image} source={item.image} />
                            }
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};