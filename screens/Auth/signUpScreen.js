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
import SignUpUser from "../../store/actions/signUpUser";

import { useDispatch, useSelector } from "react-redux";
import MainButton from "../../components/MainButton";
import colors from "../../constants/colors";

import FetchMyFeelings from "../../store/actions/FetchMyFeelings";
import UpdateFeelings from "../../store/actions/UpdateFeeling";
import AuthInputBox from "../Auth/components/authInputBox";

//helper functions
import signUpUserWithUserData from "./AuthHelperFunctions/signUpUserWithUserData";

//custom hooks
import useGetSignUpScreenState from "../../customHooks/authCustomHooks/useGetSignUpScreenState";
import useStartNewUserProcessOnToken from "../../customHooks/authCustomHooks/useStartNewUserProcessOnToken";

/**
 * Screen for allowing an existing user to login with their username and password.
 *
 */
function SignupScreen(props) {
  const {
    firstName,
    onChangeUserFirstName,
    lastName,
    onChangeUserLastName,
    userName,
    onChangeUserName,
    passWord,
    onChangePassword,
    passWordTwo,
    onChangePasswordTwo,
    dispatch,
    token,
    signUpFetchError,
    signUpFetchLoading,
  } = useGetSignUpScreenState();

  useStartNewUserProcessOnToken(token, props.navigation);

  /**
   * On submission attempt to signUp user and reset user inputs.
   */
  const handlePress = () => {
    signUpUserWithUserData(
      passWord,
      passWordTwo,
      userName,
      firstName,
      lastName,
      dispatch
    );
    onChangeUserName("");
    onChangePassword("");
    onChangeUserFirstName("");
    onChangeUserLastName("");
    onChangePasswordTwo("");
  };

  /**
   * Navigate to login screen.
   */
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
        <ScrollView
          contentContainerStyle={styles.outerJustify}
          style={{ ...styles.outerContainer, ...styles.quickBorder }}
        >
          {signUpFetchLoading ? (
            <Text>Loading</Text>
          ) : (
            <View style={{ ...styles.logCard }}>
              <Text style={styles.title}> Meditation Sign Up !</Text>
              {signUpFetchError ? (
                <Text testID={"postError"}>
                  Please try a better username and password
                </Text>
              ) : null}
              <AuthInputBox
                secureTextEntry={false}
                value={firstName}
                placeholder="First Name"
                setValue={onChangeUserFirstName}
              />
              <AuthInputBox
                secureTextEntry={false}
                value={lastName}
                placeholder="Last Name"
                setValue={onChangeUserLastName}
              />
              <AuthInputBox
                secureTextEntry={false}
                value={userName}
                placeholder="email"
                setValue={onChangeUserName}
              />
              <AuthInputBox
                secureTextEntry={true}
                value={passWord}
                placeholder="password"
                setValue={onChangePassword}
              />
              <AuthInputBox
                secureTextEntry={true}
                value={passWordTwo}
                placeholder="repeat password"
                setValue={onChangePasswordTwo}
              />
              <View>
                <MainButton
                  style={styles.button}
                  testID="signUp"
                  title="Sign up"
                  onPress={handlePress}
                />
                <MainButton
                  style={styles.signUpButton}
                  title="Switch to Login"
                  onPress={handleLogin}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default SignupScreen;

SignupScreen.navigationOptions = {
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
    height: Dimensions.get("window").height * 0.1,
  },

  formObj: {
    height: Dimensions.get("window").height * 0.08,
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
    height: Dimensions.get("window").height * 0.75,
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

    marginTop: Dimensions.get("window").height * 0.1,
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
