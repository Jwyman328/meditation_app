import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../../constants/colors";
import ScrollPicker from "react-native-wheel-scroll-picker";
import { useDispatch, useSelector } from "react-redux";
import SetUserHealthData from "../../store/actions/setUserHealthData";
import MyScrollPicker from "./components/scrollPicker";
import ContinueButton from "./components/continueButton";

import postOrUpdateProfileData from "./utils/postOrUpdateProfileData";

function ChooseWeight(props) {
  // token healthData and firstTime required to make api request ot change data
  const {
    token,
    healthData,
    isInSignUpProcess,
    weight,
    setWeights,
    weightChoosen,
    setweightChoosen,
  } = useGetChooseWeightState(props.navigation);
  const dispatch = useDispatch();

  /**
   * Set selected weight to profile healthData object and use postOrUpdateProfileData to register the change.
   *
   * postOrUpdateProfileData will update only the internal state if inTheSignUpProcess.
   * Or postOrUpdateProfileData will post the update to the database if change made outside of the signUp process.
   */
  const updateDataAndNavigate = () => {
    healthData.weight = weightChoosen;
    postOrUpdateProfileData(
      "weight",
      weightChoosen,
      healthData,
      token,
      isInSignUpProcess,
      props.navigation.navigate,
      "ChooseHeight",
      dispatch
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textIntro}>Your Weight (lbs)</Text>
      </View>
      {weight ? (
        <MyScrollPicker
          valueChange={(selectedIndex) => selectedIndex + 1}
          selectedIndex={() => weightChoosen}
          dataSource={weight}
          setValue={setweightChoosen}
        />
      ) : null}
      <ContinueButton
        goToScreen={updateDataAndNavigate}
        textValue={"Continue"}
      />
    </View>
  );
}

export default ChooseWeight;

const styles = StyleSheet.create({
  pickerContainer: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.6,
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
    marginTop: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.83,
    //height: Dimensions.get('window').height,
    marginBottom: Dimensions.get("window").height * 0.05,
  },
  textIntro: {
    fontSize: 24,
    fontFamily: "Helvetica-Oblique",
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    borderStyle: "solid",
    borderColor: colors.strongPrimary,
    borderWidth: 0,
    backgroundColor: "white",
    opacity: 0.3,
  },
});
