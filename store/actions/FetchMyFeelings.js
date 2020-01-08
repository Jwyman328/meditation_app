import React from 'react'


const FetchMyFeelings = (token) => {
    return async (dispatch) => {
    
    const response = await fetch(`http://intense-gorge-29567.herokuapp.com/personal/GetMyFeelings/`, {
        headers:{ Authorization: `JWT ${token}`}})
    const responseData = await response.json()
    console.log(responseData, '')
    dispatch({type: 'MyFeelings', MyFeelings:responseData})
    }
}

export default FetchMyFeelings