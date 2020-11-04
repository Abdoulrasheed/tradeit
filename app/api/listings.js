import { API, graphqlOperation, Storage } from "aws-amplify";
import { addLike, createListing, updateUserProfile } from "../../src/graphql/mutations";
import { listListings } from "./queries";
import config from "../../aws-exports";
import { getListing } from "../../src/graphql/queries";
import profileApi from "./auth"

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const getListings = async (nextToken) => {
  const variables = {
      nextToken,
      limit: 10,
      sortDirection: "DESC",
    }
  const response = await API.graphql(graphqlOperation(listListings, variables))
  return response
}

export const addListing = async (listingData, onUploadProgress) => {
  onUploadProgress(0.1)
  const newListing = await uploadToS3(listingData, onUploadProgress)
  const listing = await _createListing(newListing);
  const listingID = listing.data.createListing.id
  onUploadProgress(1)
  // get the newly created listing
  const response = await API.graphql(graphqlOperation(getListing, { id: listingID }))
  return response.data.getListing
};


const _createListing = async (listing) => {
  const data = {
    input: {
      title: listing.title,
      price: listing.price,
      description: listing.description,
      likes: 0,
      categoryId: listing.category.value,
      quantity: listing.quantity,
      listingOwnerId: listing.userID,
      images: []
    }
  }

  listing.imageUrls.map(url => {
    data.input.images.push({url})
  });

  if (listing.location)
    data.input.location = {
      lat: listing.location.latitude,
      lon: listing.location.longitude
    }

  try {
    const response = await API.graphql(graphqlOperation(createListing, data))
    return response
  } catch (error) {
    console.log("error creating listing", error);
  }
}

const uploadToS3 = async (listing, onUploadProgress) => {
  listing.imageUrls = []
  try {
    await Promise.all(listing.images.map(async (picture, index) => {
      const extension = picture.slice(-3)
      const rand = Math.random().toString().substring(2);
      const key = `${listing.title.toLowerCase().split(' ').join('')}_picture_${index}_${rand}.${extension}`
      
      const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
      listing.imageUrls.push(url)
      
      const data = await fetch(picture);
      const blob = await data.blob();
      
      await Storage.put(key, blob, {
          contentType: "image/jpeg",
          progressCallback({ loaded, total }) { 
            onUploadProgress(loaded / total);
          },
      });
    }))
    return listing
  } catch (error) {
    console.log("error uploading images", error);
  }
}

const likeListing = async (listingID, like, profileID ) => {
  try {
    const input = {
      input: {
        id: listingID,
        likes: like,
      }
    }
    const response = await API.graphql(graphqlOperation(addLike, input))
    // update list of liked listings
    const newLike = { listingID: listingID }
    const profile = await profileApi._getUserProfileByID(profileID)
    const oldLikes = profile.data.getUserProfile.likedListings
    let data;
    if (like > 0) {
      // add a like
      data = {
        input: {
          id: profileID,
          likedListings: [...oldLikes, newLike]
        }
      };
    } else {
      // remove a like
      const filtered = oldLikes.filter((item)=>item.listingID !== listingID)
      data = {
        input: {
          id: profileID,
          likedListings: filtered
        }
      }
    }

    API.graphql(graphqlOperation(updateUserProfile, data))
    return response.data.addLike.likes
  } catch (error) {
    console.log("error adding a like", error);
  }
}

export default {
  addListing,
  getListings,
  likeListing
};
