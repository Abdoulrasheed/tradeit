import { API, graphqlOperation } from "aws-amplify";
import { createCartItem, deleteCartItem } from "../../src/graphql/mutations";
import authApi from "./auth"

const addToCart = async (listingID, profileID) => {
    const input = { input: { cartItemListingId: listingID, cartItemProfileId: profileID } }
    try {
        await API.graphql(graphqlOperation(createCartItem, input))
        const profile = await authApi._getUserProfileByID(profileID)
        const items = profile.data.getUserProfile.cartItem.items
        return items
    } catch (error) {
        console.log("error adding to cart", error);
    }
}

const removeFromCart = async (cartItemID) => {
    const input = { input : {id: cartItemID}}
    await API.graphql(graphqlOperation(deleteCartItem, input))
}

export default {
    addToCart,
    removeFromCart
}