import produce from 'immer'
import * as actions from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
      case actions.SET_LISTINGS:
          return produce(state, draft => { draft.listings = action.payload })
      
      case actions.SET_CART_ITEMS:
          return produce(state, draft => { draft.carts = action.payload })

      case actions.SET_MY_LISTINGS:
          return produce(state, draft => { draft.myListings = action.payload })

      case actions.SET_LIKED_LISTINGS:
          return produce(state, draft => {
              draft.likedListings = action.payload
          })
      case actions.ADD_NEW_LISTING:
          const newListings = state.listings.concat(action.payload)
          return produce(state, draft => { draft.listings = newListings })
      
      case actions.UPDATE_MY_LISTINGS:
          const newMyListings = state.myListings.concat(action.payload)
          return produce(state, draft => { draft.myListings = newMyListings })

    default:
      return state;
  }
};