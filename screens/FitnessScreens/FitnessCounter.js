import React, { useState, useEffect } from "react";

import { Pedometer } from "expo-sensors";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import currentStepCount from "../../store/actions/setCurrentStepCount";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MainHeaderButtonLarge from "../../components/HeaderButtonLarge";
import PedometerCircle from "./PedometerCircle";
//custom hooks
import useGetFitnessCounterState from "../../customHooks/fitnessCustomHooks/useGetFitnessCounterState";

/**
 * Display pedometer circle.
 *
 * Get user weight from redux store and pass it to PedometerCircle to create calorie burned calculations.
 */
function FitnessApp() {
  const {
    dailyStepGoal,
    dailyGoalLocal,
    setdailyGoalLocal,
    userWeight,
    stringDate,
    isCard,
  } = useGetFitnessCounterState();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVig8_oCALM-jnm-y2e3mt7WajdgRcAK1vt4-TJqmxGN4RPxrv&s",
        }}
      >
        <View style={styles.stepCircle}>
          <Text style={styles.titleText}>Health Data</Text>
          <Text style={styles.dateText}>{stringDate}</Text>
          {dailyStepGoal && userWeight ? (
            <PedometerCircle
              weight={userWeight}
              card={isCard}
              dailyStepGoal={dailyStepGoal}
            />
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}

export default FitnessApp;

FitnessApp.navigationOptions = (navData) => {
  const navigateToMessaging = () => {
    navData.navigation.navigate("Community");
  };
  const navigateToSettings = () => {
    navData.navigation.navigate("Settings");
  };
  return {
    headerRight: (
      <ScrollView style={styles.headerStyle} horizontal={true}>
        <HeaderButtons HeaderButtonComponent={MainHeaderButtonLarge}>
          <Item
            title="filter"
            color={colors.darkStrongPrimary}
            iconName="ios-mail"
            onPress={navigateToMessaging}
          />
        </HeaderButtons>
      </ScrollView>
    ),
    headerLeft: (
      <ScrollView style={styles.headerStyle} horizontal={true}>
        <HeaderButtons HeaderButtonComponent={MainHeaderButtonLarge}>
          <Item
            title="filter"
            color={colors.darkStrongPrimary}
            iconName="ios-settings"
            onPress={navigateToSettings}
          />
        </HeaderButtons>
      </ScrollView>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircle: {
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height * .4,
    justifyContent: "center",
    alignItems: "center",
    //marginLeft: Dimensions.get('window').width * .13,
  },
  headerStyle: {
    marginTop: Dimensions.get("window").height * 0.001,
  },
  dateText: {
    fontSize: 25,
    fontFamily: "Helvetica-LightOblique",
  },
  titleText: {
    fontSize: 35,
    fontFamily: "Helvetica-LightOblique",
  },
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "contain",
  },
});
