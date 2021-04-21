import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { showToast } from "../utility/toast";
import storage from "../api/storage";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const locationEnabled = await Location.hasServicesEnabledAsync();

      if (!locationEnabled) {
        const loc = await storage.get("location");
        setLocation(loc.value);
        storage.set("location", loc);
      } else {
        const { coords: loc } = await Location.getLastKnownPositionAsync();
        setLocation(loc);
        storage.set("location", loc);
      }
    } catch (error) {
      console.log("error getting location", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
