import React from 'react'

/**
 * Fetch All Favorite meditation Courses
 */
const FetchMoodData = ( token) => {
    return async (dispatch) => {
    
    const response = await fetch(`http://intense-gorge-29567.herokuapp.com/Journal/last_week_moods/str`, {
        headers:{ Authorization: `JWT ${token}`}})
    const responseData = await response.json()
    dispatch({type: 'FetchMoodData', MoodData:responseData})
    }
}

export default FetchMoodData