import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { StyleSheet, Dimensions } from 'react-native';
import colors from '../config/colors';

import Text from './Text';

const dim = Dimensions.get("window");


const CarouselItem = ({ item, onPress }) => {
    return <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={onPress}
    >
        <Image source={{ uri: item.images[0].url }} style={styles.image} />
        <View style={styles.textContainer}>
            <Text
              style={styles.title}
              numberOfLines={2}
            >
                { item.title.toUpperCase() }
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
                {item.description}
            </Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    slideInnerContainer: {
        height: 140,
        marginRight: dim.width / 15.5,
        marginHorizontal: 35
    },
    image: {
        borderRadius: 10,
        flex: 1,
        resizeMode: 'cover',
    },
    textContainer: {
        backgroundColor: "transparent",
        position: "absolute",
        paddingTop: 18,
        paddingHorizontal: 16,
        bottom: 20
    },
    title: {
        color: colors.light,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    subtitle: {
        marginTop: 6,
        color: colors.medium,
        fontSize: 12,
        fontStyle: 'italic'
    },
});

export default CarouselItem;