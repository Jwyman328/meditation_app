import React from 'react'

const FetchAllUsers = (token) => { //Original
        return async (dispatch) => {
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/all_users`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            
            dispatch({type: 'FetchAllUsers', allUsers:responseData})
        }
}
export default FetchAllUsers;