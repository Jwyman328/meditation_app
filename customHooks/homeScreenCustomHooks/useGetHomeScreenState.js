import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetHomeScreenState() {
  const username = useSelector((state) => state.AuthData.username);
  const token = useSelector((state) => state.AuthData.token);
  const [dailyMeditationData, setDailyMeditationData] = useState(undefined);

  let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal);

  const [dailyGoalLocal, setdailyGoalLocal] = dailyStepGoal
    ? useState(dailyStepGoal)
    : null;

  return {
    username,
    token,
    dailyMeditationData,
    setDailyMeditationData,
    dailyStepGoal,
    dailyGoalLocal,
    setdailyGoalLocal,
  };
}

export default useGetHomeScreenState;
