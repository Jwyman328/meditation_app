import React from 'react'

import FetchUserFriends from './FetchUserFriends'
import FetchAllUsers from './FetchAllUsers'

import { useDispatch, useSelector } from 'react-redux'

const SendFriendRequest = (username, token) => { 
        return async (dispatch) => {
            const response = await fetch(`https://intense-gorge-29567.herokuapp.com/friends/sendFriendRequest/${username}/`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            //dispatch({type: 'AddFriend', addFriendsList:responseData})



        }
}
export default SendFriendRequest