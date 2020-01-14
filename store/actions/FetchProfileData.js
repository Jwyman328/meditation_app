import React from 'react'

const FetchProfileData = (token) => { //Original
        return async (dispatch) => {
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/get_profile_additional_data`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
            dispatch({type: 'FetchProfileData', ProfileData:responseData})
        }
}
export default FetchProfileData;