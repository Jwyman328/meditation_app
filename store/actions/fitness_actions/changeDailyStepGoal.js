import React from 'react'


const changeDailyStepGoal = (newStepGoal,token) => {
    return async (dispatch) => {

        const response = await fetch(`http://intense-gorge-29567.herokuapp.com/fitness/changeDailyStepGoal/${newStepGoal}`, {
            headers:{ Authorization: `JWT ${token}`}})
        const responseData = await response.json()
        dispatch({type: 'setNewStepGoal', newDailyStepGoal:responseData[0].daily_step_goal})
        }
}

export default changeDailyStepGoal