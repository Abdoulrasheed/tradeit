import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";
import MyStore from "../screens/MyStore";
import { Store } from "../state";
import MessagesScreen from "../screens/MessagesScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Store>
      <Tab.Navigator
        tabBarOptions={{ style: { paddingBottom: 10, height: 60 } }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="My Store"
          component={MyStore}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-appstore" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ListingEdit"
          component={ListingEditScreen}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <NewListingButton
                onPress={() => navigation.navigate(routes.LISTING_EDIT)}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={size}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Message"
          component={MessagesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </Store>
  );
};

export default AppNavigator;
