import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import SetUserHealthData from "../../store/actions/setUserHealthData";
import ContinueButton from "./components/continueButton";
import postOrUpdateProfileData from "./utils/postOrUpdateProfileData";
import useGetChooseGenderScreenState from "../../customHooks/GetUserInfoStackCustomHooks/useGetChooseGenderScreenState";

function ChooseGenderScreen(props) {
  const {
    isInSignUpProcess,
    healthData,
    gender,
    setGender,
    token,
  } = useGetChooseGenderScreenState(props.navigation);

  const dispatch = useDispatch();

  const changeGender = (gender) => {
    setGender(gender);
    healthData.gender = gender;
  };
  const updateDataAndNavigate = () => {
    postOrUpdateProfileData(
      "gender",
      gender,
      healthData,
      token,
      isInSignUpProcess,
      props.navigation.navigate,
      "ChooseWeight",
      dispatch
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text testID="title" style={styles.textIntro}>
          What's Your Sex?
        </Text>
        <View style={styles.IconContainer}>
          <TouchableOpacity
            testID="chooseMaleButton"
            onPress={() => changeGender("Male")}
          >
            <Ionicons
              testID="maleIcon"
              name="ios-man"
              size={135}
              color={gender === "Male" ? colors.primary : "grey"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID="chooseFemaleButton"
            onPress={() => changeGender("Female")}
          >
            <Ionicons
              testID="femaleIcon"
              name="ios-woman"
              size={135}
              color={gender === "Female" ? colors.primary : "grey"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ContinueButton
        goToScreen={updateDataAndNavigate}
        textValue={"Continue"}
      />
    </View>
  );
}

export default ChooseGenderScreen;

const styles = StyleSheet.create({
  IconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.1,
  },
  text: {
    opacity: 1,
  },
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: colors.lightSecondary,
    alignItems: "center",
  },
  textContainer: {
    marginTop: Dimensions.get("window").height * 0.15,
    width: Dimensions.get("window").width * 0.83,
    //height: Dimensions.get('window').height,
  },
  textIntro: {
    fontSize: 24,
    fontFamily: "Helvetica-Oblique",
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.23,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    borderStyle: "solid",
    borderColor: colors.strongPrimary,
    borderWidth: 0,
    backgroundColor: "white",
    opacity: 0.3,
  },
});
