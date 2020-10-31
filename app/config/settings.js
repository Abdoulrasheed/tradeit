import Constants from "expo-constants";

const base = {
  apiUrl: "http://tradeit.us-west-2.elasticbeanstalk.com/api/v1",
};

const settings = {
  dev: {
    ...base,
  },
  staging: {
    ...base,
  },
  prod: {
    ...base,
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
