import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};

export const navigationOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },

  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
