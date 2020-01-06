import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import FetchPendingFriendRequests from './fetchPendingFriendRequests'

import FetchUserFriends from './FetchUserFriends'
import FetchAllUsers from './FetchAllUsers'


const AcceptDenyFriendRequest = (id, Bool, token) => { 
        return async (dispatch) => {
            const response = await fetch(`https://intense-gorge-29567.herokuapp.com/friends/${id}/${Bool}/`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            console.log(responseData)
            //dispatch({type: 'AddFriend', addFriendsList:responseData})
            dispatch(FetchPendingFriendRequests(token))
            dispatch(FetchUserFriends(token))
            dispatch(FetchAllUsers(token))

        }
}
export default AcceptDenyFriendRequest