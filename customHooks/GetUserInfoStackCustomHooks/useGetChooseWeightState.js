import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSetInitialWeightRoladexValue from "./useSetInitialWeightRoladexValue";

function useGetChooseWeightState(navigation) {
  // token healthData and firstTime required to make api request ot change data
  const token = useSelector((state) => state.AuthData.token);
  const healthData = useSelector((state) => state.ProfileData.userHealthData);
  const isInSignUpProcess = navigation.getParam("firstTime");

  const [weight, setWeights] = useState([]);
  const [weightChoosen, setweightChoosen] = isInSignUpProcess
    ? useState(150)
    : useState(healthData.weight - 1);

  useSetInitialWeightRoladexValue(setWeights);

  return {
    token,
    healthData,
    isInSignUpProcess,
    weight,
    setWeights,
    weightChoosen,
    setweightChoosen,
  };
}

export default useGetChooseWeightState;
