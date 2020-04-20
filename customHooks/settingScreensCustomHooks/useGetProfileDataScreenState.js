import React from "react";
import { useSelector } from "react-redux";

function useGetProfileDataScreenState(props) {
  let fetchDailyStepsLoading = useSelector(
    (state) => state.Fitness.fetchDailyStepsLoading
  );
  let fetchDailyStepsError = useSelector(
    (state) => state.Fitness.fetchDailyStepsError
  );
  // get status of health profile data fetching
  let fetchUserDataError = useSelector( 
    (state) => state.ProfileData.fetchUserDataError
  );
  let fetchUserDataLoading = useSelector(
    (state) => state.ProfileData.fetchUserDataLoading
  );
  // get profile health data from state
  const healthData = useSelector((state) => state.ProfileData.userHealthData);
  // if each health data profile catagory exists, place it in own variable
  const weight = healthData.weight ? healthData.weight : null;
  const heightFeet = healthData.height ? healthData.height.feet : null;
  const heightInch = healthData.height ? healthData.height.inch : null;
  const DOBMonth = healthData.DOB ? healthData.DOB.month : null;
  const DOBYear = healthData.DOB ? healthData.DOB.year : null;
  const gender = healthData ? healthData.gender : null;
  // get general user data and place in own variable
  const generalUserData = useSelector(
    (state) => state.ProfileData.generalUserData
  );
  let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal);
  const firstName = generalUserData.first_name;
  const lastName = generalUserData.last_name;

  // get general page data
  const isLoggedIn = useSelector((state) => state.AuthData.loggedIn);
  const token = useSelector((state) => state.AuthData.token);

  return {
    fetchDailyStepsLoading,
    fetchDailyStepsError,
    fetchUserDataError,
    fetchUserDataLoading,
    healthData,
    weight,
    heightFeet,
    heightInch,
    DOBMonth,
    DOBYear,
    gender,
    generalUserData,
    dailyStepGoal,
    firstName,
    lastName,
    isLoggedIn,
    token,
  }
}

export default useGetProfileDataScreenState;
