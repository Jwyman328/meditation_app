import React from 'react'

const FetchUserFriends = (token) => { //Original
        return async (dispatch) => {
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/user_friends`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            dispatch({type: 'FetchUserFriends', friendsList:responseData})
        }
}
export default FetchUserFriends;