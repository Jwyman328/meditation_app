import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetFitnessCounterState() {
  let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal);
  const [dailyGoalLocal, setdailyGoalLocal] = dailyStepGoal
    ? useState(dailyStepGoal)
    : null;
  //Get weight and pass it to the class component pedometer
  const userWeight = useSelector(
    (state) => state.ProfileData.userHealthData.weight
  );
  const date = new Date();
  const stringDate = date.toLocaleDateString();
  const isCard = true;

  return {
    dailyStepGoal,
    dailyGoalLocal,
    setdailyGoalLocal,
    userWeight,
    stringDate,
    isCard,
  };
}

export default useGetFitnessCounterState;
