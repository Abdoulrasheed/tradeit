import { useContext } from "react";

import AuthContext from "./context";
import storage from "../api/storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => {
    setUser(user);
    storage.set("user", user);
  };

  const logOut = () => {
    setUser(null);
    storage.remove("user");
  };

  return { user, logIn, logOut };
};
