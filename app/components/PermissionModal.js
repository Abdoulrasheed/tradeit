import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import colors from '../config/colors';
import Button from './Button';
import Text from './Text';

const PermissionModal = ({ description, onPress, visible, buttonText = "ALLOW" }) => {
    return (
       <Modal
        avoidKeyboard={true}
        hideModalContentWhileAnimating={true}
        animationInTiming={10}
        isVisible={visible}
      >
        <View style={styles.modal}>
          <Text style={styles.alertText}>PERMISSION</Text>
          <Text style={styles.alertDescription}>
            {description}
          </Text>
          <Button onPress={onPress} title={buttonText} />
        </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
    alertDescription: {
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 10,
        textAlign: "center",
    },
    alertText: {
        color: colors.primary,
        fontWeight: "bold",
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 150,
        padding: 10,
        alignItems: "center"
    }
})

export default PermissionModal;