/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile($owner: String) {
    onCreateUserProfile(owner: $owner) {
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
          listingID
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile($owner: String) {
    onUpdateUserProfile(owner: $owner) {
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
          listingID
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile($owner: String) {
    onDeleteUserProfile(owner: $owner) {
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
          listingID
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
export const onCreateListing = /* GraphQL */ `
  subscription OnCreateListing {
    onCreateListing {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateListing = /* GraphQL */ `
  subscription OnUpdateListing {
    onUpdateListing {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteListing = /* GraphQL */ `
  subscription OnDeleteListing {
    onDeleteListing {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCartItem = /* GraphQL */ `
  subscription OnCreateCartItem {
    onCreateCartItem {
      id
      listingID
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCartItem = /* GraphQL */ `
  subscription OnUpdateCartItem {
    onUpdateCartItem {
      id
      listingID
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCartItem = /* GraphQL */ `
  subscription OnDeleteCartItem {
    onDeleteCartItem {
      id
      listingID
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
      createdAt
      updatedAt
    }
  }
`;
