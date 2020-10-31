import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, View, Text, Button } from "react-native";
import VirtualKeyboard from "react-native-virtual-keyboard";

import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { showToast } from "../utility/toast";
import { Form, SubmitButton } from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import { confirmSignUpValidationSchema as validationSchema } from "../utility/validations";

const ConfirmAccount = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);
  const [currentCount, setCount] = useState(60);
  const [userInfo, setUserInfo] = useState({ email: "" });
  const [verificationCode, setVerificationCode] = useState();
  const timer = () => setCount(currentCount - 1);
  const registerApi = useApi(authApi.register);

  const { logIn } = useAuth();

  useEffect(() => {
    if (currentCount === 60 || currentCount === 70) {
      // first render
      setUserData();
    }

    if (currentCount <= 0) return;
    const id = setInterval(timer, 1000);
    return () => {
      clearInterval(id);
    };
  }, [currentCount]);

  const setUserData = async () => {
    const userInfo = await SecureStore.getItemAsync("userInfo");
    setUserInfo(JSON.parse(userInfo));
  };

  const autoSignIn = async () => {
    try {
      const user = await registerApi.request(userInfo);
      logIn(user);
    } catch (err) {
      if (err.message) {
        showToast(err.message);
      } else {
        showToast("registration error !");
      }
    }
  };

  const confirmSignUp = async (code) => {
    try {
      registerApi.setLoading(true);
      await Auth.confirmSignUp(userInfo.email, code);
      showToast("Successfully verified");
      autoSignIn();
    } catch (err) {
      if (err.code == "NotAuthorizedException") autoSignIn();
      if (!err.message) {
        showToast("Error: Can't verify you !");
      } else {
        showToast(err.message);
      }
      setDisabled(false);
    }
    registerApi.setLoading(false);
  };

  const resendConfirmationCode = async () => {
    setDisabled(true);
    try {
      await Auth.resendSignUp(userInfo.email);
      showToast("code resent successfully");
      setCount(currentCount * 2);
    } catch (err) {
      if (!err.message) {
        showToast("Error: something's wrong !");
      } else {
        showToast(err.message);
      }
      setDisabled(false);
    }
  };

  const handleConfirmation = (val) => {
    if (val.length === 6) {
      confirmSignUp(val);
    }

    setVerificationCode(val);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ confirmationCode: "" }}
          onSubmit={(val) => handleConfirmation(val)}
          validationSchema={validationSchema}
        >
          <View>
            <Button
              title={
                currentCount
                  ? `Waiting for confirmation code - ${currentCount}`
                  : "Resend confirmation code"
              }
              disabled={currentCount ? true : disabled}
              color={colors.primary}
              onPress={() => resendConfirmationCode()}
            />
            <Text
              style={styles.text}
            >{`A verication code has been send to ${userInfo.email}`}</Text>
            <Text style={styles.text2} onPress={() => navigation.goBack()}>
              Change email
            </Text>

            <View>
              <Text style={styles.verificationCode}>{verificationCode}</Text>

              <VirtualKeyboard
                decimal={false}
                cellStyle={styles.cell}
                rowStyle={styles.row}
                color={colors.primary}
                pressMode="string"
                onPress={(val) => handleConfirmation(val)}
              />
              <SubmitButton
                title="Verify"
                width={300}
                style={styles.submitButton}
              />
            </View>
          </View>
        </Form>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "space-around",
  },
  cell: {
    backgroundColor: colors.light,
    borderRadius: 10,
    height: 50,
    marginHorizontal: 10,
  },
  inputLabel: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 25,
    textAlign: "center",
    color: colors.primary,
  },
  resendText: {
    textAlign: "center",
    padding: 15,
    backgroundColor: colors.white,
  },
  submitButton: {
    marginTop: 20,
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  text2: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
    color: colors.primary,
  },
  verificationCode: {
    fontSize: 30,
    marginVertical: 30,
    textAlign: "center",
  },
});

export default ConfirmAccount;
