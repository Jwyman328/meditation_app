import React from 'react'

/**
 * Fetch All Favorite meditation Courses
 */
const FetchFavorites = (token) => {
    return async (dispatch) => {
    
    const response = await fetch('http://intense-gorge-29567.herokuapp.com/course_meditations/favorited', {
        headers:{ Authorization: `JWT ${token}`}})
    const responseData = await response.json()
    dispatch({type: 'FetchFavorites', FavoriteData:responseData})
    }
}

export default FetchFavorites