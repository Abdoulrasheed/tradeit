import React, { useReducer, createContext } from "react";
import { ListingContext } from "../auth/context";
import { reducer } from "./reducers";


const initialState = { listings: [], myListings: [], carts: [], likedListings: [] };

const Store = (props) => {
  const state = useReducer(reducer, initialState);
  return <ListingContext.Provider value={state}>{props.children}</ListingContext.Provider>;
};

export default Store;