import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import produce from 'immer'

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import Text from "../components/Text";
import listingApi from "../api/listings"
import routes from "../navigation/routes";
import { showToast } from "../utility/toast";

const MyStore = ({ navigation }) => {
    const [listings, setListings] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user, logIn: updateProfile } = useAuth()

    useEffect(() => {
       setListings(user.profile.listings.items)
    }, []);
    
    const handleDelete = async (listing) => {
        const newListings = listings.filter((m) => m.id !== listing.id)
        const updatedProfile = produce(user, draft => {
            draft.profile.listings = newListings
        })
        updateProfile(updatedProfile)
        await listingApi.removeListing(listing.id)
        showToast("Successfully deleted !")
    };
    
    return (
        <>
            <View style={styles.top}>
                <Text style={styles.text}>My Store</Text>
            </View>
            <Screen>
                {listings && listings.length === 0 && <Text style={styles.nolistingText}>Your listings will appear here</Text>}
                <FlatList
                    data={listings}
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
                    onRefresh={() => {
                        setListings(user.profile.listings.items);
                    }}
                />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    nolistingText: {
        color: colors.primary,
        fontSize: 14,
        textAlign: "center"
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
        fontSize: 20
    },
});

export default MyStore;
