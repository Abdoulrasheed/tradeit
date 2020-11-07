import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import { navigationOptions } from "./navigationTheme";
import Header from "./Header";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={navigationOptions}>
    <Stack.Screen
      options={{
        headerTitle: (props) => <Header {...props} />,
      }}
      name="Listings"
      component={ListingsScreen}
    />
    <Stack.Screen name="ListingDetails"
      component={ListingDetailsScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
