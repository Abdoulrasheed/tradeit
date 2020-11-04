export const isLiked = (listingID, likedListings) => {
    const check = (element) => element.listingID === listingID;
    if (listingID) {
        const found = likedListings.some(check)
        return found
    }
}