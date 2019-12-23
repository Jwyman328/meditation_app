import React from 'react'
/**
 * Add the selected course to the array of favorite courses
 * @param {string} courseId the id for the course
 */
const fetchMeditationsAndAddToAllMeditations = () => {
    return async (dispatch) => {
        // now here you can do any asynch code you want 
        const response = await fetch('http://127.0.0.1:8000/all_meditation_courses/')
        const responseJson = await response.json()
        //dispatch({
            //type: 'setData',
            //mealId: mealId
        //})
    }
}


const getAllmeditations = (courseId) => {
    return async (dispatch) => {

    const response = await fetch('http://127.0.0.1:8000/all_meditation_courses/')
    const responseData = await response.json()
    return responseData
    }
}

export default fetchMeditationsAndAddToAllMeditations


// add initial data as meditation data 
