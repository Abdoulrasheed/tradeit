/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchAddlistings = /* GraphQL */ `
  mutation BatchAddlistings($listings: [CreateListingInput]) {
    batchAddlistings(listings: $listings) {
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
export const addLike = /* GraphQL */ `
  mutation AddLike($input: AddLikeInput) {
    addLike(input: $input) {
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
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
export const createPicture = /* GraphQL */ `
  mutation CreatePicture(
    $input: CreatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    createPicture(input: $input, condition: $condition) {
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
export const updatePicture = /* GraphQL */ `
  mutation UpdatePicture(
    $input: UpdatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    updatePicture(input: $input, condition: $condition) {
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
export const deletePicture = /* GraphQL */ `
  mutation DeletePicture(
    $input: DeletePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    deletePicture(input: $input, condition: $condition) {
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
export const createListing = /* GraphQL */ `
  mutation CreateListing(
    $input: CreateListingInput!
    $condition: ModelListingConditionInput
  ) {
    createListing(input: $input, condition: $condition) {
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
export const updateListing = /* GraphQL */ `
  mutation UpdateListing(
    $input: UpdateListingInput!
    $condition: ModelListingConditionInput
  ) {
    updateListing(input: $input, condition: $condition) {
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
export const deleteListing = /* GraphQL */ `
  mutation DeleteListing(
    $input: DeleteListingInput!
    $condition: ModelListingConditionInput
  ) {
    deleteListing(input: $input, condition: $condition) {
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
export const createCartItem = /* GraphQL */ `
  mutation CreateCartItem(
    $input: CreateCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    createCartItem(input: $input, condition: $condition) {
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
export const updateCartItem = /* GraphQL */ `
  mutation UpdateCartItem(
    $input: UpdateCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    updateCartItem(input: $input, condition: $condition) {
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
export const deleteCartItem = /* GraphQL */ `
  mutation DeleteCartItem(
    $input: DeleteCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    deleteCartItem(input: $input, condition: $condition) {
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
