import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import audioBookPlaylist from "../../Data/AudioBookPlaylist";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MainHeaderButton from "../../components/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import addFavorite2 from "../../store/actions/addFavorite";
import FetchCourseData from "../../store/actions/fetchCourseData";
import IndividualMeditationCard from "./components/individualMeditationCard";
import colors from "../../constants/colors";
import convertSecToMinSec from "./components/convetSecToMinSec";
import useGetFullCourseScreenState from "../../customHooks/meditationScreensCustomHooks/useGetFullCourseScreenState";

/**
 * Display all available meditaion audios for the selected course.
 *
 * @param {Array} data.AudioCoursesId Array of audios ids for this course
 * @param {String} data.courseId id for the entire course
 * @param {String} data.image_uri link refering to background image
 * @param {String} data.title course title
 */
function FullCourseScreen(props) {
  const {
    data,
    courseId,
    courseData,
    fetchCourseDataLoding,
    fetchCourseDataError,
    token,
    favoriteMeditations,
  } = useGetFullCourseScreenState(props.navigation);
  const dispatch = useDispatch();

  /**
   * Send the user to the individual meditation screen to play the meditation audio.
   * @param {String} meditaionId Id for the meditation audio selected
   */
  const goToMeditation = (meditaionId) => {
    props.navigation.navigate("IndividualMeditationScreen", {
      data: { meditationData: meditaionId, uri: data.image_uri },
    });
  };

  /**
   * Create a display card for each meditation audio in the course.
   *
   * Display the meditation audios' order number, title, play time.
   * Allow ability to select audio and go to said audios play screen.
   * @param {String} item audioCourseId for the selected audio meditation
   */
  const createMeditationCard = (item) => {
    const time = convertSecToMinSec(item.time);
    return (
      <IndividualMeditationCard
        time={time}
        item={item}
        goToMeditation={goToMeditation}
        orderNumber={item.orderNumber}
        title={item.title}
      />
    );
  };

  return courseData ? (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.backgroundImageStyle}
        source={{ uri: data.image_uri }}
      >
        {fetchCourseDataLoding ? (
          <Text> Meditation Course Data loading </Text>
        ) : fetchCourseDataError ? (
          <Text>Error: could not find data</Text>
        ) : (
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.title}</Text>
            </View>
            <View style={styles.meditionContainer}>
              <FlatList
                keyExtractor={(item) => item.title.toString()}
                contentContainerStyle={{ alignItems: "center" }}
                data={courseData}
                renderItem={({ item }) => createMeditationCard(item)}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  ) : null;
}

export default FullCourseScreen;

/**
 * Set a heart icon for allowing the ability to favorite and unfavorite the course.
 */
FullCourseScreen.navigationOptions = (navData) => {
  const addCourseToFavorites = navData.navigation.getParam(
    "addCourseToFavorites"
  );
  const courseTitle = navData.navigation.getParam("courseTitle");
  const favoriteMeditations = navData.navigation.getParam(
    "favoriteMeditations"
  );
  const courseId = navData.navigation.getParam("courseId");

  /**
   * Add the course to the meditation Favorites.
   */
  const addFavorite = () => {
    addCourseToFavorites();
  };

  /**
   * Handle the heart Icon's color.
   * @Return a black color for the heart icon, or a pink color based on if the course is favorited.
   */
  const isInfavorites = () => {
    if (favoriteMeditations && favoriteMeditations.includes(courseId)) {
      return "#e75480";
    } else {
      return "black";
    }
  };

  /**
   * Handle the Heart Icon.
   * @returns a full heart icon or a outline heart icon based on if the course is favorited.
   */
  const getHeartIcon = () => {
    if (favoriteMeditations && favoriteMeditations.includes(courseId)) {
      return "ios-heart";
    } else {
      return "ios-heart-empty";
    }
  };
  return {
    headerTitle: courseTitle,
    headerTintColor: colors.primary,
    headerTitleStyle: {
      fontFamily: "Helvetica-Oblique",
      fontSize: 24,
    },
    headerRight: (
      <ScrollView style={styles.headerRight} horizontal={true}>
        <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
          <Item
            size={25}
            title="filter"
            color={isInfavorites()}
            iconName={getHeartIcon()}
            onPress={addFavorite}
          />
        </HeaderButtons>
      </ScrollView>
    ),
  };
};

const styles = StyleSheet.create({
  meditionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  backgroundImageStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerRight: {
    marginTop: Dimensions.get("window").height * 0.02,
  },
});
