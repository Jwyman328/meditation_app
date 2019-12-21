import React from 'react'
/**
 * Fetch All meditations
 */


const FetchAllCourses = () => {
    return async (dispatch) => {

    const response = await fetch('https://intense-gorge-29567.herokuapp.com/all_meditation_courses/')
    const responseData = await response.json()
    dispatch({type: 'FetchAllCourses', allMeditationCourses:responseData})
    }
}

export default FetchAllCourses