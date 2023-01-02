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
            height: "contentHeight",
        },
        carousel: {
            width: "100%",
            height: "100%"
        },
        slide: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 50,
        },
        selectedImage: {
            width: 100,
            borderRadius: 50,
            height: 100,
            borderWidth: 3,
            borderColor: "#97E491",
            boxShadow: "0px 0px 15px 10px #5CE337",
        }
    });
    
    return (
        <View style={styles.CarouselContainer}>
            {titel && <Text>{titel}</Text>}
            <FlatList
                data={data}
                style={styles.carousel}
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