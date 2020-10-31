import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Keyboard } from "react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
