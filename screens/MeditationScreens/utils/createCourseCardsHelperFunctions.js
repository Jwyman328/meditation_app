import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CourseCard from "../components/CourseCard";

/**
 * Navigate to the Full course screen of the selected course.
 * @param {string} title course title
 * @param {string} uri background image link
 * @param {Array} catagories course catagories eg.[Anxiety, Begginer]
 * @param {Array} AudioCoursesId Ids refering to the audio files for this course
 * @param {string} courseId Id of the course
 */
/* const goToCourse = (courseId, image_uri, title) => {
  props.navigation.navigate("FullCourse", {
    courseData: { courseId: courseId, image_uri: image_uri, title: title },
  });
}; */

/**
 * Create a touchable display card for a course.
 * @param {Array<Object>} course a meditation course
 */
const createCards = (course, goToCourse) => {
  return (
    <View style={{ ...styles.coursesContainer }}>
      <CourseCard
        testID={`course${course.item.id}`}
        goToCourse={goToCourse}
        title={course.item.title}
        uri={course.item.image_uri}
        catagories={course.item.catagories}
        id={course.item.id}
        courseId={course.item.course_id}
      />
    </View>
  );
};
/**
 * Create a single meditation course card
 * @param {Object} course
 */
const createCard = (course, goToCourse) => {
  return (
    <View style={{ ...styles.coursesContainer }}>
      <CourseCard
        testID={`course${course.id}`}
        goToCourse={goToCourse}
        title={course.title}
        uri={course.image_uri}
        catagories={course.catagories}
        id={course.id}
        courseId={course.course_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  coursesContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.01,
  },
});

export { createCard, createCards };
