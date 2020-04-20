import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetChooseDOBCustomHook(navigation) {
  const healthData = useSelector((state) => state.ProfileData.userHealthData);
  const isInSignUpProcess = navigation.getParam("firstTime");

  const [month, setmonth] = useState([]);
  const [year, setyeares] = useState([]);

  const [monthChoosen, setmonthChoosen] = isInSignUpProcess
    ? useState(6)
    : useState(healthData.DOB.month);
  const [yearChoosen, setyearChoosen] = isInSignUpProcess
    ? useState(6)
    : useState(healthData.DOB.year);

  // token healthData and firstTime required to make api request ot change data
  const token = useSelector((state) => state.AuthData.token);

  return {
    healthData,
    isInSignUpProcess,
    month,
    setmonth,
    year,
    setyeares,
    monthChoosen,
    setmonthChoosen,
    yearChoosen,
    setyearChoosen,
    token
  };
}

export default useGetChooseDOBCustomHook;
