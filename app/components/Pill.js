import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import Text from './Text';

const Pill = ({ activeItem, item, onPress }) => {
    const i = useMemo(() => item, []);
    const handlePress = () => { i.value == activeItem ? onPress(null) :  onPress(i.value) }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.pill, activeItem == i.value && styles.active]}>
                <Text style={styles.text}>{i.label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    active: {
        backgroundColor: colors.danger
    },
    pill: {
        borderRadius: 25,
        backgroundColor: colors.light,
        width: 90,
        height: 50,
        marginBottom: 45,
        marginHorizontal: 5,
        justifyContent: "center",
        padding: 5,
    },
    text: {
        fontSize: 14,
        textAlign: "center",
    }
})

export default Pill;