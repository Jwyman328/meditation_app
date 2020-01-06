import React from 'react'

/**
 * Fetch All Fpending friend requests
 */
const FetchPendingFriendRequests = (token) => {
    return async (dispatch) => {
    console.log('fetched')
    const response = await fetch('http://intense-gorge-29567.herokuapp.com/friends/pending_friend_requests/', {
        headers:{ Authorization: `JWT ${token}`}})
    const responseData = await response.json()
    dispatch({type: 'PendingFriendRequests', pendingFriendRequests:responseData})
    }
}

export default FetchPendingFriendRequests