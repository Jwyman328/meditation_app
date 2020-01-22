import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'
import axios from 'axios'
/**
 * Fetch All Fpending friend requests
 */
const FetchPendingFriendRequests = (token) => {
    return async (dispatch) => {
    dispatch(LoadFetch('fetchPendingFriendRequestsLoading'))
    const response = await axios('http://intense-gorge-29567.herokuapp.com/friends/pending_friend_requests/', {
        headers:{ Authorization: `JWT ${token}`}}).then(async(response)=>{
            if (response.status === 400){
                dispatch(FetchError('fetchPendingFriendRequestsError'))
            }else{
                console.log('no')

                dispatch(FetchSuccess('fetchPendingFriendRequestsSuccess'))
                const responseData = await response.data
                dispatch({type: 'PendingFriendRequests', pendingFriendRequests:responseData})
            }
           
        }).catch((response) => {
            dispatch(FetchError('fetchPendingFriendRequestsError'))
        })
   
    }
}

export default FetchPendingFriendRequests