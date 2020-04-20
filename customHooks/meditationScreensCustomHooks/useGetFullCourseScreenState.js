import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FetchCourseData from "../../store/actions/fetchCourseData";
import addFavorite2 from "../../store/actions/addFavorite";

function useGetFullCourseScreenState(navigation) {
  const data = navigation.getParam("courseData");
  const courseId = data.courseId;
  const courseData = useSelector((state) => state.meditation.courseData);
  const fetchCourseDataLoding = useSelector(
    (state) => state.meditation.fetchCourseDataLoading
  );
  const fetchCourseDataError = useSelector(
    (state) => state.meditation.fetchCourseDataError
  );
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AuthData.token);
  const favoriteMeditations = useSelector(
    (state) => state.meditation.favoriteMeditations
  );

  /**
   * Adds this course to the array of favorited courses
   * @function addFavorite store action to add a course id to favorite courses
   */
  const addCourseToFavorites = () => {
    dispatch(addFavorite2(courseId, token));
  };

  /**
   * send relavant data to the navigationOptiosn to handle favoriting.
   *  relevant data includes addCourseToFavorites function, favoriteMeditations array and
   * this course's courseId in order to handle the favoriting settings which are relevant to
   * the header heart icon.
   *
   */
  useEffect(() => {
    if (data && !fetchCourseDataLoding && !fetchCourseDataError) {
      const favoriteMeditationsIdArray = favoriteMeditations.map(
        (item) => item.id
      );
      dispatch(FetchCourseData(data.courseId));
      navigation.setParams({
        addCourseToFavorites: addCourseToFavorites,
        favoriteMeditations: favoriteMeditationsIdArray,
        courseId: courseId,
        courseTitle: data.title,
      });
    } else {
      //
    }
  }, [data, favoriteMeditations]);

  return {
    data,
    courseId,
    courseData,
    fetchCourseDataLoding,
    fetchCourseDataError,
    token,
    favoriteMeditations,
  };
}

export default useGetFullCourseScreenState;
