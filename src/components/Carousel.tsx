import { View, Text, FlatList, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import { assetInterface } from '../util/itemObjects';



type CarouselProps = {
    onEmit: Function;
    titel: string;
    data: any[];
};

export default function Carousel({ titel, data, onEmit }: CarouselProps) {
    const dimensions = useDimensions();
    const [selectedItem, setSelectedItem] = useState();


    const styles = StyleSheet.create({
        CarouselContainer: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 0.75 * dimensions.window.width,
            height: "100%",
        },
        carousel: {
            width: "100%",
            height: "100%"
        },
        slide: {
            padding: 16,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
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

    useEffect(() => {
        console.log(data);
    }, [data])

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
                    <View style={styles.slide}>
                        <TouchableOpacity onPress={() => { setSelectedItem(item.id); onEmit(item.id) }}>
                            {item.image &&
                                item.id === selectedItem ?
                                <Image style={styles.selectedImage} source={item.image} /> :
                                <Image style={styles.image} source={item.image} />
                            }
                            {item.id && <Text>{item.id}</Text>}
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};