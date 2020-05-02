import React from 'react'
/**
 * Make a request that will add the select course to favorites or remove it if already favorited.
 * @param {string} courseId the id for the course
 * @param {string} token the jwt token used for making http requests
 */

const AddFavorite2 = (courseId, token) => { //Original
        const id = courseId.toString()
        return async (dispatch) => {
            const response = await fetch(`https://intense-gorge-29567.herokuapp.com/course_meditations/add_favorite_course/${id}/`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            dispatch({type: 'AddFavorite', allMeditations:responseData})
        }
}
export default AddFavorite2