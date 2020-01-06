import React from 'react'

import FetchUserFriends from './FetchUserFriends'
import FetchAllUsers from './FetchAllUsers'

import { useDispatch, useSelector } from 'react-redux'

const AddRemoveFriend = (username, token) => { 
        return async (dispatch) => {
            const response = await fetch(`https://intense-gorge-29567.herokuapp.com/friends/addRemoveFriend/${username}/`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            console.log(responseData)
            //dispatch({type: 'AddFriend', addFriendsList:responseData})
            dispatch(FetchUserFriends(token))
            dispatch(FetchAllUsers(token))
        }
}
export default AddRemoveFriend