import { useContext, useState } from "react";

import { ListingContext } from "./context";

export default useListing = () => {
    const api = useContext(ListingContext);
    const updateListings = (listings) => {
        api.setListings(listings);
    };

  return { api, updateListings }
};
