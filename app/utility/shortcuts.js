export const isLiked = (listingID, likedListings) => {
    const check = (element) => element.listingID === listingID;
    if (listingID && likedListings) {
        return likedListings.some(check)
    }
}

export const isInCart = (listingID, cartItems) => {
    const check = (element) => element.listing.id === listingID;
    if (listingID) {
        return cartItems.some(check)
    }
}