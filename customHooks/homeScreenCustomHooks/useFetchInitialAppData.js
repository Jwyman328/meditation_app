import React, { useEffect } from "react";
import FetchAllCourses from "../../store/actions/meditation_actions/FetchAllCourses";
import FetchFavorites from "../../store/actions/meditation_actions/fetchFavorites";
import FetchUserFriends from "../../store/actions/friendsAndMsgs_actions/FetchUserFriends";
import FetchMyFeelings from "../../store/actions/meditation_actions/FetchMyFeelings";
import FetchDailyStepGoal from "../../store/actions/fitness_actions/fetchDailyStepGoal";
import FetchMoodData from "../../store/actions/journal_emotions_actions/FetchMoodData";
import FetchProfileData from "../../store/actions/getUserInfo_actions/FetchProfileData";
import { useDispatch, useSelector } from "react-redux";
import { getDailyMeditation } from "../../screens/HomeScreen/homeScreenUtils/dailyMeditationHelperFunctions";

/**
 * When user logs in set daily meditation data.
 * Fetch all meditation courses.
 * Fetch all favorite meditations.
 * Fetch all friends of the user.
 * Fetch feelings data.
 * Fetch user's daily step goal.
 * Fetch users mood data.
 * Fetch user's profile data.
 */
function useFetchInitialAppData(token, setDailyMeditationData) {
  const dispatch = useDispatch();

  useEffect(() => {
    getDailyMeditation(setDailyMeditationData);
    dispatch(FetchAllCourses());
    dispatch(FetchFavorites(token));
    dispatch(FetchUserFriends(token));
    dispatch(FetchMyFeelings(token));
    dispatch(FetchDailyStepGoal(token));
    dispatch(FetchMoodData(token));
    dispatch(FetchProfileData(token));
  }, [dispatch]);
}

export default useFetchInitialAppData;
