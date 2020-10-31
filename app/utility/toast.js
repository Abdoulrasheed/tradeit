import { ToastAndroid } from "react-native";

export const showToast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    25,
    50
  );
};
