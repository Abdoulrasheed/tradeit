import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Constants from "expo-constants";

import colors from "../config/colors";
import TextInput from "../components/TextInput";

const Header = ({ listings }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          clearButtonMode="always"
          icon="shield-search"
          onSelectionChange={() => setModalVisible(true)}
          onFocus={() => setModalVisible(true)}
          onBlur={() => setModalVisible(false)}
          placeholder="Search..."
          style={styles.search}
          width={300}
        />
        <MaterialCommunityIcons name="message-text" size={32} color={colors.light} />
      </View>
      <Modal
        animationInTiming={0}
        coverScreen={false}
        hasBackdrop={false}
        hideModalContentWhileAnimating={true}
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        propagateSwipe={true}
        style={{ marginHorizontal: 0 }}
      >
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <MaterialCommunityIcons
              color={colors.primary}
              size={24}
              style={styles.back}
              name="keyboard-backspace"
            />
          </TouchableWithoutFeedback>
          <View>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  back: {
    marginVertical: 10,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  modal: {
    backgroundColor: colors.light,
    marginTop: Constants.statusBarHeight * 20,
    height: 400,
  },
  search: {
    backgroundColor: colors.light,
    borderRadius: 15,
    flex: 1,
    padding: 3.5,
  },
});

export default Header;
