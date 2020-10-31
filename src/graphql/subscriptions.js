/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile($owner: String) {
    onCreateUserProfile(owner: $owner) {
      id
      listings {
        items {
          id
          name
          price
          description
          likes
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
        bucket
        region
        key
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
      listings {
        items {
          id
          name
          price
          description
          likes
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
        bucket
        region
        key
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
      listings {
        items {
          id
          name
          price
          description
          likes
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
        bucket
        region
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePicture = /* GraphQL */ `
  subscription OnCreatePicture($owner: String) {
    onCreatePicture(owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePicture = /* GraphQL */ `
  subscription OnUpdatePicture($owner: String) {
    onUpdatePicture(owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePicture = /* GraphQL */ `
  subscription OnDeletePicture($owner: String) {
    onDeletePicture(owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateListing = /* GraphQL */ `
  subscription OnCreateListing {
    onCreateListing {
      id
      name
      price
      owner {
        id
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        owner
      }
      description
      likes
      images {
        items {
          id
          name
          owner
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
export const onUpdateListing = /* GraphQL */ `
  subscription OnUpdateListing {
    onUpdateListing {
      id
      name
      price
      owner {
        id
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        owner
      }
      description
      likes
      images {
        items {
          id
          name
          owner
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
export const onDeleteListing = /* GraphQL */ `
  subscription OnDeleteListing {
    onDeleteListing {
      id
      name
      price
      owner {
        id
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        owner
      }
      description
      likes
      images {
        items {
          id
          name
          owner
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
export const onCreateCartItem = /* GraphQL */ `
  subscription OnCreateCartItem {
    onCreateCartItem {
      id
      listingID
      owner {
        id
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          bucket
          region
          key
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
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          bucket
          region
          key
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
        listings {
          nextToken
        }
        cartItem {
          nextToken
        }
        picture {
          bucket
          region
          key
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
