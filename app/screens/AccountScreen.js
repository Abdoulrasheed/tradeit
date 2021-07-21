import React from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import AuthNavigator from "../navigation/AuthNavigator";

const menuItems = [
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  if (!user) return <AuthNavigator />;

  const handleLogOut = () => {
    Alert.alert("Exit", "Are you sure you wants to logout ?", [
      {
        text: "Yes",
        onPress: () => logOut(),
      },
      {
        text: "No",
        style: "cancel",
        onPress: false,
      },
    ]);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={user.profile.picture}
          defaultPicture={require("../assets/person.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => handleLogOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  cancel: {},
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 10,
  },
});

export default AccountScreen;
