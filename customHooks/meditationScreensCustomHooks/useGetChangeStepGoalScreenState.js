

import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

function useGetChangeStepGoalScreenState(props) {

    const isLoggedIn = useSelector((state) => state.AuthData.loggedIn);
    const token = useSelector((state) => state.AuthData.token);
  
    let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal);
    const [dailyGoalLocal, setdailyGoalLocal] = useState(dailyStepGoal);

    return {isLoggedIn,token, dailyStepGoal,dailyGoalLocal, setdailyGoalLocal }
}

export default useGetChangeStepGoalScreenState;