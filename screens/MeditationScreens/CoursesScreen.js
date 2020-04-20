import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MainHeaderButton from "../../components/HeaderButton";
import CourseCard from "./components/CourseCard";
import colors from "../../constants/colors";
import dummyData from "../../Data/dummyData";

import { useSelector } from "react-redux";

import FiltersModal from "./FiltersModal";
import useGetCoursesScreen from "../../customHooks/meditationScreensCustomHooks/useGetCoursesScreen";

import {
  createCard,
  createCards,
} from "./utils/createCourseCardsHelperFunctions";
/**
 * A screan that lists all available courses for the user to select.
 * @returns a screen containing all the Available courses based on Filters selected
 */
function CoursesScreen(props) {
  const {
    filtersVisible,
    setfiltersVisible,
    filteredCourses,
    fetchCoursesLoading,
    fetchCoursesError,
    isLoggedIn,
  } = useGetCoursesScreen();

  /**
   * Navigate to the Full course screen of the selected course.
   * @param {string} title course title
   * @param {string} uri background image link
   * @param {Array} catagories course catagories eg.[Anxiety, Begginer]
   * @param {Array} AudioCoursesId Ids refering to the audio files for this course
   * @param {string} courseId Id of the course
   */
  const goToCourse = (courseId, image_uri, title) => {
    props.navigation.navigate("FullCourse", {
      courseData: { courseId: courseId, image_uri: image_uri, title: title },
    });
  };

  return (
    <View style={styles.mainContainer}>
      {isLoggedIn ? (
        fetchCoursesLoading ? (
          <Text testID="loadingMsg">Loading</Text>
        ) : fetchCoursesError ? (
          <Text testID="errorMsg">Error loading meditations</Text>
        ) : (
          <View
            style={{ ...styles.allCoursesContainer, ...styles.quickBorder }}
          >
            {filteredCourses ? (
              filteredCourses.length > 1 ? (
                <FlatList
                  numColumns={2}
                  data={filteredCourses}
                  keyExtractor={(item) => item.title}
                  renderItem={(course) => createCards(course, goToCourse)}
                />
              ) : (
                createCard(filteredCourses[0], goToCourse)
              )
            ) : null}
          </View>
        )
      ) : null}
    </View>
  );
}

export default CoursesScreen;

/**
 * Set a touchable filter icon on the top header to display the filter screen.
 */
CoursesScreen.navigationOptions = (navData) => {
  //const [filterModal, setFilterModal] = useState(false)
  const navigateToFiltersPage = () => {
    navData.navigation.navigate("Filters");
  };
  const navigateToMyFeelingFilter = () => {
    navData.navigation.navigate("FeelingsFilter");
  };
  return {
    headerRight: (
      <ScrollView style={styles.headerRight} horizontal={true}>
        <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
          <Item
            title="filter"
            color={colors.darkStrongPrimary}
            iconName="ios-funnel"
            onPress={navigateToFiltersPage}
          />
        </HeaderButtons>
      </ScrollView>
    ),
    headerLeft: (
      <ScrollView style={styles.headerRight} horizontal={true}>
        <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
          <Item
            title="filter"
            color={colors.darkStrongPrimary}
            iconName="ios-color-filter"
            onPress={navigateToMyFeelingFilter}
          />
        </HeaderButtons>
      </ScrollView>
    ),
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkStrongPrimary,
  },
  coursesContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.01,
  },
  quickBorder: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
  headerRight: {
    marginTop: Dimensions.get("window").height * 0.02,
  },
  allCoursesContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
