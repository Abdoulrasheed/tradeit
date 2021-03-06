import { Auth, graphqlOperation, API } from "aws-amplify";
import { createUserProfile } from "../../src/graphql/mutations";
import { listUserProfiles, getUserProfile } from "../api/queries";

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
    const cognito = await Auth.signIn(user.email, user.password);
    const profileInstance = await _createProfile(cognito.attributes.name);
    const profile = profileInstance.data.getUserProfile;
    return { ...cognito.attributes, profile };
  } catch (error) {
    console.log("error creating an account", error);
  }
};

const login = async ({ email, password }) => {
  const cognito = await Auth.signIn(email, password);
  const profile = await _getUserProfileByOwner(cognito.username);
  return { ...cognito.attributes, profile };
};

const _createProfile = async (fullname) => {
  const input = { input: { fullname } };

  try {
    const response = await API.graphql(
      graphqlOperation(createUserProfile, input)
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
    console.log("error getting profile by owner", error);
  }
};

export default { createUser, _getUserProfileByID, login, register };
