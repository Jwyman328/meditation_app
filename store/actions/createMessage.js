import React from 'react'

import FetchUserFriends from './FetchUserFriends'

import { useDispatch, useSelector } from 'react-redux'

const CreateMessage = (reciever_username, msg, token) => { 
        return async (dispatch) => {
            usernamePassword = {msg: msg, reciever_username: reciever_username}
            let jsonUsername = JSON.stringify(usernamePassword)
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/friends/create_message/`,{
                method:'POST',body:jsonUsername, headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            console.log(responseData)
            //dispatch({type: 'AddFriend', addFriendsList:responseData})
            dispatch(FetchUserFriends(token))
        }
}
export default CreateMessage