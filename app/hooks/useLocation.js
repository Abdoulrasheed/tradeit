import { useEffect, useState } from "react";
import * as Location from "expo-location";
import storage from "../api/storage";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const loc = await storage.get("location");
      if (loc) return setLocation(loc.value);

      const { coords } = await Location.getLastKnownPositionAsync();
      setLocation(coords);

      storage.set("location", coords);
    } catch (error) {
      console.log("error getting location", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
