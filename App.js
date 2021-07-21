import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import config from "./aws-exports";
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";

import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import authAPi from "./app/api/auth";
import authStorage from "./app/api/storage";
import logger from "./app/utility/logger";
import navigationTheme from "./app/navigation/navigationTheme";
import { navigationRef } from "./app/navigation/rootNavigation";
import OfflineNotice from "./app/components/OfflineNotice";

logger.start();
Amplify.configure(config);

Auth.currentCredentials()
  .then((d) => console.log("data: ", d))
  .catch((e) => console.log("error: ", e));

const App = () => {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.get("user");
    if (user) {
      try {
        const response = await authAPi._getUserProfileByID(
          user.value.profile.id
        );
        setUser({ ...user.value, profile: response.data.getUserProfile });
      } catch (e) {
        if (user.value) {
          setUser(user.value);
        } else {
          setUser(user);
        }
      }
    }
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
