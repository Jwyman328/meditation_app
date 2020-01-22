import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'

/**
 * Fetch step goal
 */


const FetchDailyStepGoal = (token) => {
    return async (dispatch) => {
    dispatch(LoadFetch('fetchDailyStepsLoading'))
    const response = await fetch('http://intense-gorge-29567.herokuapp.com/fitness/dailyStepGoal/', {
        headers:{ Authorization: `JWT ${token}`}}).then(async(response) => {
            const responseData = await response.json()
            if(responseData[0]){
                dispatch(FetchSuccess('fetchDailyStepsSuccess'))
                dispatch({type: 'FetchDailyStepGoal', dailyStepGoal:responseData[0].daily_step_goal})
        
            }else{
                dispatch(FetchError('fetchDailyStepsError'))
            }
        }).catch(async(response) => {
            dispatch(FetchError('fetchDailyStepsError'))
        })

    }
}

export default FetchDailyStepGoal