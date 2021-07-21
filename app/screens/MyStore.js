import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import AuthNavigator from "../navigation/AuthNavigator";
import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import Text from "../components/Text";
import routes from "../navigation/routes";
import { showToast } from "../utility/toast";
import { ListingContext } from "../auth/context";
import { SET_MY_LISTINGS } from "../state/actions";

const MyStore = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const [state, dispatch] = useContext(ListingContext);

  if (!user) return <AuthNavigator />;

  useEffect(() => {
    setListings(user.profile.listings.items);
    setRefreshing(false);
  }, [refreshing]);

  const handleDelete = async (listing) => {
    const newListings = state.listings.filter((item) => item.id !== listing.id);
    //await listingApi.removeListing(listing.id)
    setListings(newListings);
    showToast("Successfully deleted !");
  };

  const setListings = (data) => {
    dispatch({ type: SET_MY_LISTINGS, payload: data });
  };

  return (
    <>
      <View style={styles.top}>
        <Text style={styles.text}>My Store</Text>
      </View>
      <Screen>
        {state.myListings && state.myListings.length === 0 && (
          <Text style={styles.nolistingText}>
            Your listings will appear here
          </Text>
        )}
        <FlatList
          data={state.myListings}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.description}
              image={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(!refreshing)}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  nolistingText: {
    color: colors.primary,
    fontSize: 14,
    textAlign: "center",
  },
  top: {
    backgroundColor: colors.primary,
    height: Constants.statusBarHeight * 3.3,
    justifyContent: "flex-end",
    width: "100%",
  },
  text: {
    marginVertical: 10,
    marginHorizontal: 20,
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MyStore;
