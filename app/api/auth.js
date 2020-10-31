import { Auth, graphqlOperation, API } from "aws-amplify";
import {
  createUserProfile,
  updateUserProfile,
} from "../../src/graphql/mutations";
import { getUserProfile, listUserProfiles } from "../../src/graphql/queries";

const createUser = async (data) => {
  const user = {
    username: data.email,
    password: data.password,
    attributes: {
      name: data.name,
    },
  };
  const response = await Auth.signUp(user);
  return response;
};

const register = async (user) => {
  try {
    await Auth.signIn(user.email, user.password);
    const profileInstance = await _createProfile();
    const profile = profileInstance.data.getUserProfile;
    return { ...user, profile };
  } catch (error) {
    console.log("error creating an account", error);
  }
};

const login = async ({ username, password }) => {
  try {
    const response = await Auth.signIn(username, password);
    const user = response.attributes;
    const profile = await _getUserProfileByOwner(user.username);
    return { ...user, profile };
  } catch (error) {
    console.log("error signin", error);
  }
};

const _createProfile = async () => {
  const userProfile = { input: {} };

  try {
    const response = await API.graphql(
      graphqlOperation(createUserProfile, userProfile)
    );

    const { id: profileID } = response.data.createUserProfile;

    const profile = await _getUserProfileByID(profileID);
    return profile;
  } catch (error) {
    console.log(error);
  }
};

const _getUserProfileByID = async (profileID) => {
  // get user profile and return it
  try {
    const profile = await API.graphql(
      graphqlOperation(getUserProfile, { id: profileID })
    );
    return profile;
  } catch (error) {
    console.log(error);
  }
};

const _getUserProfileByOwner = async (userSub) => {
  // get user profile and return it
  try {
    const input = {
      filter: {
        owner: {
          eq: userSub,
        },
      },
    };

    const response = await API.graphql(
      graphqlOperation(listUserProfiles, input)
    );

    const result = response.data.listUserProfiles.items[0];

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default { createUser, register, login };
