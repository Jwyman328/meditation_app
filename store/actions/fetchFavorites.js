import React from 'react'
import axios from 'axios'
/**
 * Fetch All Favorite meditation Courses
 */
const FetchFavorites = (token) => {
    return async (dispatch) => {

    const response = await axios('http://intense-gorge-29567.herokuapp.com/course_meditations/favorited', {
        headers:{ Authorization: `JWT ${token}`}})
    const responseData = await response.data
    dispatch({type: 'FetchFavorites', FavoriteData:responseData})
    }
}

export default FetchFavorites