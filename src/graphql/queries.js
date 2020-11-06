/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const nearbyListings = /* GraphQL */ `
  query NearbyListings(
    $location: LocationInput!
    $m: Int
    $limit: Int
    $nextToken: String
  ) {
    nearbyListings(
      location: $location
      m: $m
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        price
        owner {
          id
          fullname
          createdAt
          updatedAt
          owner
        }
        description
        likes
        images {
          url
        }
        location {
          lat
          lon
        }
        categoryId
        quantity
        carts {
          nextToken
        }
        createdAt
        updatedAt
      }
      total
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      fullname
      listings {
        items {
          id
          title
          price
          description
          likes
          categoryId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
      cartItem {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      picture {
        url
      }
      likedListings {
        listingID
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fullname
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          url
        }
        likedListings {
          listingID
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getListing = /* GraphQL */ `
  query GetListing($id: ID!) {
    getListing(id: $id) {
      id
      title
      price
      owner {
        id
        fullname
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          url
        }
        likedListings {
          listingID
        }
        createdAt
        updatedAt
        owner
      }
      description
      likes
      images {
        url
      }
      location {
        lat
        lon
      }
      categoryId
      quantity
      carts {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listListings = /* GraphQL */ `
  query ListListings(
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        price
        owner {
          id
          fullname
          createdAt
          updatedAt
          owner
        }
        description
        likes
        images {
          url
        }
        location {
          lat
          lon
        }
        categoryId
        quantity
        carts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCartItem = /* GraphQL */ `
  query GetCartItem($id: ID!) {
    getCartItem(id: $id) {
      id
      listing {
        id
        title
        price
        owner {
          id
          fullname
          createdAt
          updatedAt
          owner
        }
        description
        likes
        images {
          url
        }
        location {
          lat
          lon
        }
        categoryId
        quantity
        carts {
          nextToken
        }
        createdAt
        updatedAt
      }
      profile {
        id
        fullname
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          url
        }
        likedListings {
          listingID
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCartItems = /* GraphQL */ `
  query ListCartItems(
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCartItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        listing {
          id
          title
          price
          description
          likes
          categoryId
          quantity
          createdAt
          updatedAt
        }
        profile {
          id
          fullname
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchListings = /* GraphQL */ `
  query SearchListings(
    $filter: SearchableListingFilterInput
    $sort: SearchableListingSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchListings(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        price
        owner {
          id
          fullname
          createdAt
          updatedAt
          owner
        }
        description
        likes
        images {
          url
        }
        location {
          lat
          lon
        }
        categoryId
        quantity
        carts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
