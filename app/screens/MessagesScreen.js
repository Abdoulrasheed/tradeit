import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import AuthNavigator from "../navigation/AuthNavigator";
import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import useAuth from "../auth/useAuth";

const initialMessages = [
  {
    id: 1,
    title: "Abdulrasheed Ibrahim",
    description: "Hey! Is this item still available?",
    image: require("../assets/person.jpg"),
  },
  {
    id: 2,
    title: "Abdulrasheed Ibrahim",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../assets/person.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  if (!user) return <AuthNavigator />;

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            defaultPicture={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/person.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
