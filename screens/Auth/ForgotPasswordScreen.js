import React, { useState, useEffect } from "react";

import {
  AsyncStorage,
  ScrollView,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Dimensions,
  ImageBackground,
} from "react-native";
import SignUpUser from "../../store/actions/auth_actions/signUpUser";

import { useDispatch, useSelector } from "react-redux";
import MainButton from "../../components/MainButton";
import colors from "../../constants/colors";

import ResetPassword from "../../store/actions/auth_actions/ResetPassword";
import AuthInputBox from "./components/authInputBox";

//customHooks
import useGetForgotPasswordScreenState from "../../customHooks/authCustomHooks/useGetForgotPasswordScreenState";
import useNavigateToLoginWhenEmailSent from "../../customHooks/authCustomHooks/useNavigateToLoginWhenEmailSent";

/**
 * Screen for allowing an existing user to reset password
 *
 */
function ForgotPasswordScreen(props) {
  const {
    userName,
    onChangeUserName,
    resetPasswordFetchError,
    resetPasswordFetchLoading,
    resetPasswordEmailSent,
    resetPasswordLoading,
  } = useGetForgotPasswordScreenState();
  useNavigateToLoginWhenEmailSent(props.navigation);

  const dispatch = useDispatch();

  /**
   * Attempt to ResetPassword with selected email-username.
   */
  const handlePress = () => {
    onChangeUserName("");
    dispatch(ResetPassword(userName));
  };

  const handleLogin = () => {
    props.navigation.navigate("Auth");
  };

  return (
    <View styles={styles.imageContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s",
        }}
      >
        {resetPasswordLoading ? (
          <Text>Loading</Text>
        ) : (
          <ScrollView
            contentContainerStyle={styles.outerJustify}
            style={{ ...styles.outerContainer, ...styles.quickBorder }}
          >
            <View style={{ ...styles.logCard }}>
              <Text style={styles.title}> Reset Password !</Text>
              {resetPasswordFetchError ? (
                <Text>Please enter a valid existing user email</Text>
              ) : null}
              <AuthInputBox
                secureTextEntry={false}
                value={userName}
                placeholder="email"
                setValue={onChangeUserName}
              />

              <View>
                <MainButton
                  style={styles.button}
                  testID="resetButton"
                  title="Reset"
                  onPress={handlePress}
                />
                <MainButton
                  style={styles.signUpButton}
                  title="Switch to Login"
                  onPress={handleLogin}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
}

export default ForgotPasswordScreen;

ForgotPasswordScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    flex: 1,
    width: "100%",
    //backgroundColor:colors.primary,
  },
  outerJustify: {
    justifyContent: "center",
    alignItems: "center",
  },
  formPair: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.13,
  },

  formObj: {
    height: Dimensions.get("window").height * 0.09,
  },
  inputBox: {
    borderStyle: "solid",
    borderColor: colors.strongPrimary,
    borderWidth: 1,
    flex: 1,
    fontSize: 18,
  },
  quickBorder: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    flex: 1,
  },
  logCard: {
    height: Dimensions.get("window").height * 0.65,
    width: Dimensions.get("window").width * 0.85,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 0,
    opacity: 0.75,

    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 2,

    marginTop: Dimensions.get("window").height * 0.12,
    backgroundColor: colors.lightSecondary,
  },
  button: {
    marginBottom: 25,
  },
  signUpButton: {
    backgroundColor: colors.strongPrimary,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Oblique",
  },
});
