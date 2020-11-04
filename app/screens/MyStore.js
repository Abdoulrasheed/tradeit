import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Text from '../components/Text';

const MyStore = () => {
    return (
        <Screen style={styles.container}>
            <Text>My Store</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default MyStore;