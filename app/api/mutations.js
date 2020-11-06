export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
            createdAt
            id
            listing {
            categoryId
            createdAt
            description
            id
            images {
                url
            }
            likes
            location {
                lat
                lon
            }
            price
            quantity
            title
            updatedAt
            }
        }
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