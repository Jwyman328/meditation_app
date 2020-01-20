import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'

/**
 * Fetch All Fpending friend requests
 */
const FetchPendingFriendRequests = (token) => {
    return async (dispatch) => {
    dispatch(LoadFetch('fetchPendingFriendRequestsLoading'))
    const response = await fetch('http://intense-gorge-29567.herokuapp.com/friends/pending_friend_requests/', {
        headers:{ Authorization: `JWT ${token}`}}).then(async(response)=>{
            dispatch(FetchSuccess('fetchPendingFriendRequestsSuccess'))
            const responseData = await response.json()
            dispatch({type: 'PendingFriendRequests', pendingFriendRequests:responseData})
        }).catch((response) => {
            dispatch(FetchError('fetchPendingFriendRequestsError'))
        })
   
    }
}

export default FetchPendingFriendRequests