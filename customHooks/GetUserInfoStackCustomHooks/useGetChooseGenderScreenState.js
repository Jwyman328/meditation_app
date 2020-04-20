import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetChooseGenderScreenState(navigation) {
  const isInSignUpProcess = navigation.getParam("firstTime");
  const healthData = useSelector((state) => state.ProfileData.userHealthData);
  const [gender, setGender] = isInSignUpProcess
    ? useState("Male")
    : useState(healthData.gender);
  const token = useSelector((state) => state.AuthData.token);

  return { isInSignUpProcess, healthData, gender, setGender, token };
}

export default useGetChooseGenderScreenState;
