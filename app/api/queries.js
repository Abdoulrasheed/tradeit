export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      listings {
        items {
          categoryId
          createdAt
          description
          id
          likes
          images {
            url
          }
          location {
            lat
            lon
          }
          price
          quantity
          title
          updatedAt
        }
        nextToken
      }
      fullname
      owner
      picture {
        url
      }
      likedListings {
        listingID
      }
      updatedAt
      createdAt
      id
      cartItem {
        items {
          listingID
          id
          updatedAt
          createdAt
        }
      }
    }
    nextToken
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
      likes
      price
      quantity
      title
      categoryId
      createdAt
      description
      id
      location {
        lat
        lon
      }
      owner {
        id
        fullname
        listings {
          items {
            categoryId
            createdAt
            description
            id
            likes
            images {
              url
            }
            location {
              lat
              lon
            }
            price
            quantity
            title
            updatedAt
          }
          nextToken
        }
        picture{
          url
        }
        owner
      }
      images {
        url
      }
    }
      nextToken
    }
  }
`;