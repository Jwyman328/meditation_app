import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'
import axios from 'axios'
/**
 * Fetch All meditations
 */

const FetchAllCourses = () => {
    return async (dispatch) => {
        dispatch(LoadFetch('fetchCoursesLoading'))
    const response = await axios.get('https://intense-gorge-29567.herokuapp.com/all_meditation_courses/').then(async(response) => {
        const responseData = await response.data
        dispatch({type: 'FetchAllCourses', allMeditationCourses:responseData})
        dispatch(FetchSuccess('fetchCoursesSuccess'))
    }).catch(async(response) => {
        dispatch(FetchError('fetchCoursesError'))
    })
   
    }
}

export default FetchAllCourses