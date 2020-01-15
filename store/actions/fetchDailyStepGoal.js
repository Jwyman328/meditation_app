import React from 'react'
/**
 * Fetch All meditations
 */


const FetchDailyStepGoal = (token) => {
    return async (dispatch) => {

    const response = await fetch('http://intense-gorge-29567.herokuapp.com/fitness/dailyStepGoal/', {
        headers:{ Authorization: `JWT ${token}`}})
    const responseData = await response.json()
    if(responseData[0]){
        dispatch({type: 'FetchDailyStepGoal', dailyStepGoal:responseData[0].daily_step_goal})

    }else{
        console.log('no daily step goals yet')
    }
    }
}

export default FetchDailyStepGoal