import { API, graphqlOperation } from "aws-amplify";
import { createCartItem } from "../../src/graphql/mutations";

const addToCart = async (listingID, profileID) => {
    const input = {
        input: {
            listingID,
            cartItemOwnerId: profileID
        }
    }
    try {
        const response = await API.graphql(graphqlOperation(createCartItem, input))
        console.log(response);
        conresponse.data.createCartItem.id
    } catch (error) {
        console.log("error adding to cart", error);
    }
}

export default {
    addToCart
}