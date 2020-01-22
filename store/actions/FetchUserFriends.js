import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'
import axios from 'axios'

const FetchUserFriends = (token) => { 
        return async (dispatch) => {
            dispatch(LoadFetch('fetchFriendsLoading'))
            const response = await axios(`http://intense-gorge-29567.herokuapp.com/user_friends`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}}).then(async(response) =>{
                dispatch(FetchSuccess('fetchFriendsSuccess'))
                const responseData = await response.data
                dispatch({type: 'FetchUserFriends', friendsList:responseData})
            }).catch(async(response)=> {
                dispatch(FetchError('fetchFriendsError'))
            })
         
        }
}
export default FetchUserFriends;