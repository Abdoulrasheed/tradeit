import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import routes from "./routes";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterScreenConfirm from "../screens/ConfirmAccount";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen
      name={routes.CONFIRM_REGISTER}
      component={RegisterScreenConfirm}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
