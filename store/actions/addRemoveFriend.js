import React from 'react'


const AddRemoveFriend = (username, token) => { 
        const id = courseId.toString()
        return async (dispatch) => {
            const response = await fetch(`https://intense-gorge-29567.herokuapp.com/friends/addRemoveFriend/${username}/`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            dispatch({type: 'AddFriend', addFriendsList:responseData})
        }
}
export default AddRemoveFriend