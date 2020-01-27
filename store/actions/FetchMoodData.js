import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'
import axios from 'axios'

/**
 * Fetch All Favorite meditation Courses
 */
const FetchMoodData = ( token) => {
    return async (dispatch) => {
    dispatch(LoadFetch('fetchMoodDataLoading'))
    const response = await axios(`http://intense-gorge-29567.herokuapp.com/Journal/last_week_moods/str`, {
        headers:{ Authorization: `JWT ${token}`}}).then(async(response) => {
            const responseData = await response.data
            if(responseData[0]){
                dispatch({type: 'FetchMoodData', MoodData:responseData})
        
            }else{
                //
                dispatch(FetchError('fetchMoodDataError'))
            }
        }).catch(async(response) => {
            dispatch(FetchError('fetchMoodDataError'))
        })

    }
}

export default FetchMoodData