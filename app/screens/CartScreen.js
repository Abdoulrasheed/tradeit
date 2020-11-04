import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import Screen from '../components/Screen';

const CartScreen = () => {
    return (
        <Screen style={styles.container}>
            <Text>Cart</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default CartScreen;