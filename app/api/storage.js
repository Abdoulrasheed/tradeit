import { AsyncStorage } from "react-native";
import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 120;

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

const set = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    const item = JSON.parse(value);

    if (!item) return null;

    if (key === "user") return item;

    if (isExpired(item)) {
      // Command Query Separation (CQS)
      await AsyncStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (key) => {
  try {
    // Command Query Separation (CQS)
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export default { set, get, remove };
