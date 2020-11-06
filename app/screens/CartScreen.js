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
import cartApi from "../api/cart"
import routes from "../navigation/routes";
import { showToast } from "../utility/toast";

const CartScreen = ({ navigation }) => {
    const [carts, setCarts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user, logIn: updateProfile } = useAuth()

    useEffect(() => {
       setCarts(user.profile.cartItem.items)
    }, []);
    
    const handleDelete = async (cart) => {
        const newCarts = carts.filter((m) => m.id !== cart.id)
        const updatedProfile = produce(user, draft => {
            draft.profile.cartItem.items = newCarts
        })
        updateProfile(updatedProfile)
        await cartApi.removeFromCart(cart.id)
        showToast("Successfully deleted !")
    };
    
    return (
        <>
            <View style={styles.top}>
                <Text style={styles.text}>Cart</Text>
            </View>
            <Screen>
                {carts && carts.length === 0 && <Text style={styles.nolistingText}>Items you add to your cart will appear here</Text>}
                <FlatList
                    data={carts}
                    keyExtractor={(message) => message.id.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.listing.title}
                            subTitle={item.listing.description}
                            image={item.listing.images[0].url}
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item.listing)}
                            renderRightActions={() => (
                                <ListItemDeleteAction onPress={() => handleDelete(item.listing)} />
                            )}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setCarts(user.profile.listings.items);
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

export default CartScreen;
