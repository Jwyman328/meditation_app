import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSetFeetAndInchesRoladex from './useSetFeetAndInchesRoladex';

function useGetChooseHeightState(navigation) {
  const isInSignUpProcess = navigation.getParam("firstTime");

  // token healthData and firstTime required to make api request ot change data
  const token = useSelector((state) => state.AuthData.token);
  const healthData = useSelector((state) => state.ProfileData.userHealthData);

  const [feet, setFeet] = useState([]);
  const [inch, setInches] = useState([]);
  const [feetChoosen, setfeetChoosen] = isInSignUpProcess
    ? useState(5)
    : useState(healthData.height.feet);
  const [inchChoosen, setinchChoosen] = isInSignUpProcess
    ? useState(5)
    : useState(healthData.height.inch);

    useSetFeetAndInchesRoladex(setFeet,setInches);

  return {
    isInSignUpProcess,
    token,
    healthData,
    feet,
    setFeet,
    inch,
    setInches,
    feetChoosen,
    setfeetChoosen,
    inchChoosen,
    setinchChoosen,
  };
}

export default useGetChooseHeightState;
