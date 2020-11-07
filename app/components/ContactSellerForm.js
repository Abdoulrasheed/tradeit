import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { Alert, Keyboard } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";

import colors from '../config/colors';
import Button from './Button';
import Text from './Text';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

const ContactSellerForm = ({ listing }) => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message to the seller.");
    }
    
    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "Awesome!",
      body: "Your message was sent to the seller.",
    });
  };

  return (
    <View style={styles.container}>
      <Modal
        avoidKeyboard={true}
        hideModalContentWhileAnimating={true}
        animationInTiming={5}
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        onSwipeComplete={() => setVisible(false)}
      >
        <View style={styles.modal}>
           <Form
            initialValues={{ message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              maxLength={255}
              multiline
              name="message"
              numberOfLines={3}
              placeholder="Message..."
            />
            <SubmitButton title="Send" />
          </Form>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <Button
          title="Contact Seller"
          onPress={() => setVisible(true)}
        />
      </View>
    </View>
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
  buttonContainer: {
    alignSelf: "center",
    width: 300,
  },
  container: {
    marginBottom: 20
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 15,
    height: 200,
    padding: 10,
    alignItems: "center"
  }
})
  
  export default ContactSellerForm;