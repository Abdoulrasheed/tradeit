import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";

import Screen from "../components/Screen";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import { showToast } from "../utility/toast";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .label("Password"),
});

function RegisterScreen({ navigation }) {
  const registerApi = useApi(authApi.createUser);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo, { setFieldError }) => {
    try {
      await registerApi.request(userInfo);
      SecureStore.setItemAsync("userInfo", JSON.stringify(userInfo));
      showToast(
        "Successfully registered, please check your email for a verification code"
      );
      navigation.navigate(routes.CONFIRM_REGISTER);
    } catch ({ message }) {
      showToast(message);
      registerApi.setLoading(false);
    }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Fullname"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
  },
});

export default RegisterScreen;
