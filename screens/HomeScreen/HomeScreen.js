import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FetchAllCourses from "../../store/actions/meditation_actions/FetchAllCourses";
import FetchFavorites from "../../store/actions/meditation_actions/fetchFavorites";
import FetchUserFriends from "../../store/actions/friendsAndMsgs_actions/FetchUserFriends";
import FetchMyFeelings from "../../store/actions/meditation_actions/FetchMyFeelings";
import FetchDailyStepGoal from "../../store/actions/fitness_actions/fetchDailyStepGoal";
import FetchMoodData from "../../store/actions/journal_emotions_actions/FetchMoodData";
import FetchProfileData from "../../store/actions/getUserInfo_actions/FetchProfileData";

import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";

import audioBookPlaylist from "../../Data/AudioBookPlaylist";
import dummyData from "../../Data/dummyData";

import PedometerCircle from "../FitnessScreens/PedometerCircle";
import {
  createDailyMeditationCard,
  getDailyMeditation,
} from "./homeScreenUtils/dailyMeditationHelperFunctions";
import useGetHomeScreenState from "../../customHooks/homeScreenCustomHooks/useGetHomeScreenState";
import useFetchInitialAppData from "../../customHooks/homeScreenCustomHooks/useFetchInitialAppData";

/**
 * Landing screen after the user logs in.
 *
 * As well necessarypost login actions like fetching meditations will take place
 */
function HomeScreen(props) {
  const dispatch = useDispatch();
  const {
    username,
    token,
    dailyMeditationData,
    setDailyMeditationData,
    dailyStepGoal,
    dailyGoalLocal,
    setdailyGoalLocal,
  } = useGetHomeScreenState();
  useFetchInitialAppData(token, setDailyMeditationData);

  /**
   * Navigate to the Journal Screen
   */
  const goToJournalScreen = () => {
    props.navigation.navigate("Feeling");
  };
  /**
   * Navigate to fitness screen
   */
  const goToFitnessScreen = () => {
    props.navigation.navigate("Fitness");
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
        <View
          style={{
            height: Dimensions.get("window").height * 0.9,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/*<View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.title}>Welcome {username}</Text>
                    </View>*/}
          <View style={styles.emotionFace}>
            <Text
              testID="title"
              style={{ ...styles.title, color: colors.base }}
            >
              I'm feeling?
            </Text>
            <TouchableOpacity
              testID="iconFaceTouchable"
              onPress={goToJournalScreen}
            >
              <MaterialCommunityIcons
                testID="faceIcon"
                size={130}
                color={colors.lightSecondary}
                name={"emoticon-happy"}
                title="play"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              testID="pedometerTouchable"
              onPress={goToFitnessScreen}
            >
              <View>
                {dailyStepGoal ? (
                  <PedometerCircle
                    testID="pedometer"
                    card={false}
                    dailyStepGoal={dailyStepGoal}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            {dailyMeditationData
              ? createDailyMeditationCard(
                  dailyMeditationData,
                  props.navigation.navigate
                )
              : null}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;

//HomeScreen.navigationOptions = {header:null}

const styles = StyleSheet.create({
  dailyCardImage: {
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 90,
  },
  DailyTitle: {
    fontSize: 30,
    fontFamily: "Helvetica-LightOblique",
    color: "white",
  },
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.93,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.9,
  },
  welcomeContainer: {},
  title: {
    marginTop: Dimensions.get("window").height * 0.07,
    color: colors.base,
    fontSize: 33,
    fontFamily: "Helvetica-LightOblique",
  },
  dailyCard: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").height * 0.1, //85
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: Dimensions.get("window").width * 0.1, //90
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dailyMeditationTitleContainer: {
    //marginLeft: Dimensions.get('window').width * .1,
  },
  dailyMeditationTitle: {
    fontSize: 30,
    fontFamily: "Helvetica-LightOblique",
    color: colors.base,
  },
  emotionFace: {
    justifyContent: "center",
    alignItems: "center",
  },
});
