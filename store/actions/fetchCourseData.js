import React from 'react'
/**
 * Fetch All meditations
 */


const FetchCourseData = (course_id) => {
    return async (dispatch) => {

    const response = await fetch(`http://intense-gorge-29567.herokuapp.com/course_meditations/${course_id}/`)
    const responseData = await response.json()
    dispatch({type: 'FetchCourseData', CourseData:responseData})
    }
}

export default FetchCourseData