import React from 'react'
import LoadFetch from '../fetchLoadErrorSucces/loadFetch'
import FetchSuccess from '../fetchLoadErrorSucces/fetchSuccess'
import FetchError from '../fetchLoadErrorSucces/fetchError'
import axios from 'axios'

const FetchProfileData = (token) => { 
        return async (dispatch) => {
            dispatch(LoadFetch('fetchUserDataLoading'))
            const response = await axios(`http://intense-gorge-29567.herokuapp.com/get_profile_additional_data`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}}).then(async(response) => {
                const responseData = await response.data
                dispatch({type: 'FetchProfileData', ProfileData:responseData})
                dispatch(FetchSuccess('fetchUserDataSuccess'))
            }).catch(async(response) => {
                dispatch(FetchError('fetchUserDataError'))
            })
            
        }
}
export default FetchProfileData;