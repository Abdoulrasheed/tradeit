import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

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
import { SET_CART_ITEMS } from "../state/actions";

const CartScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth()
    const [state, dispatch] = useContext(ListingContext);

    useEffect(() => {
        setCarts(user.profile.cartItem.items)
        setRefreshing(false)
    }, [refreshing]);
    
    const handleDelete = async (cart) => {
        const newCarts = state.carts.filter((item) => item.listing.id !== cart.id)
        setCarts(newCarts)
        //await cartApi.removeFromCart(cart.id)
        showToast("Successfully deleted !")
    };

    const setCarts = (data) => {
        dispatch({
            type: SET_CART_ITEMS,
            payload: data
        })
    }
    
    return (
        <>
            <View style={styles.top}>
                <Text style={styles.text}>Cart</Text>
            </View>
            <Screen>
                {state.carts && state.carts.length === 0 && <Text style={styles.nolistingText}>Items you add to your cart will appear here</Text>}
                <FlatList
                    data={state.carts}
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
                    onRefresh={() => { setRefreshing(!refreshing) }}
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
