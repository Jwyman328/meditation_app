import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'
/**
 * Fetch All meditations
 */


const FetchAllCourses = () => {
    return async (dispatch) => {
        dispatch(LoadFetch('fetchCoursesLoading'))
    const response = await fetch('https://intense-gorge-29567.herokuapp.com/all_meditation_courses/').then(async(response) => {
        const responseData = await response.json()
        dispatch({type: 'FetchAllCourses', allMeditationCourses:responseData})
        dispatch(FetchSuccess('fetchCoursesSuccess'))
    }).catch(async(response) => {
        console.log('bad request')
        dispatch(FetchError('fetchCoursesError'))
    })
   
    }
}

export default FetchAllCourses