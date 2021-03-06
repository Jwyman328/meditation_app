import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import LogOutUser from "../../store/actions/auth_actions/logOut";
import MainButton from "../../components/MainButton";
import colors from "../../constants/colors";

import changeDailyStepGoal from "../../store/actions/fitness_actions/changeDailyStepGoal";

function SettingsScreen(props) {
  const goToProfileDataScreen = () => {
    props.navigation.navigate("ProfileDataScreen");
  };

  return (
    <View>
      <Button title="ProfileData" onPress={goToProfileDataScreen} />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    width: 500,
    height: 200,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    //height: Dimensions.get('window').height * .09,
    flex: 1,
    width: 100,
    height: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,

    fontSize: 18,
  },
  boxContainer: {
    // marginTop: 100,
    marginLeft: 50,
    width: 200,
    height: 100,
    borderStyle: "solid",
    borderColor: colors.strongPrimary,
    borderWidth: 1,
    fontSize: 18,
  },
});
