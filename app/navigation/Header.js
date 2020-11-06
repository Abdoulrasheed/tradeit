import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { WaveIndicator as Loader } from 'react-native-indicators';

import colors from "../config/colors";
import TextInput from "../components/TextInput";


const dim = Dimensions.get("window");

const Header = ({ listings }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searching, setSearching] = useState(true);

  const onChange = (values) => {
    if (values.length > 2) {
      console.log(values);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          clearButtonMode="always"
          icon="shield-search"
          onSelectionChange={() => setModalVisible(true)}
          onFocus={() => setModalVisible(true)}
          onBlur={() => setModalVisible(false)}
          onChangeText={(val) => onChange(val)}
          placeholder="Search..."
          style={styles.search}
          width={dim.width - 110}
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
            {
              searching && <Loader style={styles.loader} color={colors.primary} count={10} size={60} />
            }
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
  loader: {
    alignSelf: "center",
    marginTop: 100
  },
  modal: {
    alignSelf: "center",
    backgroundColor: colors.light,
    height: dim.height - 120,
    marginTop: dim.height - Constants.statusBarHeight,
    paddingHorizontal: 15,
    width: dim.width,
  },
  search: {
    backgroundColor: colors.light,
    borderRadius: 15,
    flex: 1,
    padding: 3.5,
  },
});

export default Header;
