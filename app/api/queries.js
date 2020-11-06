export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      fullname
      listings {
        items {
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
        }
        nextToken
      }
      cartItem {
        items {
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
          }
          id
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
      cartItem {
        items {
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
          profile {
            createdAt
            fullname
            id
            likedListings {
              listingID
            }
            listings {
              items {
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
            picture {
              url
            }
          }
        }
      }
      fullname
      id
      likedListings {
        listingID
      }
      listings {
        items {
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
      picture {
        url
      }
    }
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
      images {
        url
      }
    }
      nextToken
    }
  }
`;
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
      owner {
        cartItem {
          nextToken
        }
        createdAt
        fullname
        id
        likedListings {
          listingID
        }
        listings {
          items {
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
          }
        }
        picture {
          url
        }
      }
      price
      quantity
      title
      updatedAt
    }
      total
      nextToken
    }
  }
`;