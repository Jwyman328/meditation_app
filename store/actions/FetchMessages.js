import React from 'react'

/**
 * Fetch All Favorite meditation Courses
 */
const FetchMessages = (reciever_username, token) => {
    return async (dispatch) => {
    
    const response = await fetch(`http://intense-gorge-29567.herokuapp.com/friends/message_history/${reciever_username}/`, {
        headers:{ Authorization: `JWT ${token}`}})
    const responseData = await response.json()
    dispatch({type: 'FetchSingleUserMessages', SingleMessages:responseData})
    }
}

export default FetchMessages