import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import { navigationOptions } from "./navigationTheme";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={navigationOptions}>
    <Stack.Screen name="Account" component={AccountScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
