import React from 'react'
import LoadFetch from '../fetchLoadErrorSucces/loadFetch'
import FetchSuccess from '../fetchLoadErrorSucces/fetchSuccess'
import FetchError from '../fetchLoadErrorSucces/fetchError'
import axios from 'axios'
/**
 * Fetch All meditations course data 
 */


const FetchCourseData = (course_id) => {
    return async (dispatch) => {
    dispatch(LoadFetch('fetchCourseDataLoading'))
    const response = await axios(`http://intense-gorge-29567.herokuapp.com/course_meditations/${course_id}/`).then(async(response) => {
        const responseData = await response.data
        dispatch(FetchSuccess('fetchCourseDataSuccess'))
        dispatch({type: 'FetchCourseData', CourseData:responseData})
    }).catch(async(response) => {
        dispatch(FetchError('fetchCourseDataError'))
    })
    
    }
}

export default FetchCourseData