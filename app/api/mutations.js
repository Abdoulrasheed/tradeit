export const addLikedListingToProfile = /* GraphQL */ `
  mutation AddLikedListingToProfile($input: AddLikedListingToProfileInput!) {
    addLikedListingToProfile(input: $input) {
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
      owner
    }
  }
`;