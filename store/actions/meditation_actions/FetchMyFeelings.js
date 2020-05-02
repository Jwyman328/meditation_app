import React from 'react'
import LoadFetch from '../fetchLoadErrorSucces/loadFetch'
import FetchSuccess from '../fetchLoadErrorSucces/fetchSuccess'
import FetchError from '../fetchLoadErrorSucces/fetchError'
import axios from 'axios'
const FetchMyFeelings = (token) => {
    return async (dispatch) => {
    dispatch(LoadFetch('fetchFeelingsLoading'))
    const response = await axios(`http://intense-gorge-29567.herokuapp.com/personal/GetMyFeelings/`, {
        headers:{ Authorization: `JWT ${token}`}}).then(async(response) => {
            dispatch(FetchSuccess('fetchFeelingsSuccess'))
            const responseData = await response.data
            dispatch({type: 'MyFeelings', MyFeelings:responseData})
        }).catch(async(response) => {
            dispatch(FetchError('fetchFeelingsError'))
        })
   
    }
}

export default FetchMyFeelings