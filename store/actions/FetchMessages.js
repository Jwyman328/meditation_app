import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'

/**
 * Fetch All Favorite meditation Courses
 */
const FetchMessages = (reciever_username, token) => {
    return async (dispatch) => {
    dispatch(LoadFetch('fetchSingleMessagesLoading'))
    const response = await fetch(`http://intense-gorge-29567.herokuapp.com/friends/message_history/${reciever_username}/`, {
        headers:{ Authorization: `JWT ${token}`}}).then(async(response) => {
            dispatch(FetchSuccess('fetchSingleMessagesSuccess'))
            const responseData = await response.json()
            dispatch({type: 'FetchSingleUserMessages', SingleMessages:responseData})
        }).catch((response) => {
            dispatch(FetchError('fetchSingleMessagesError'))
        })
   
    }
}

export default FetchMessages