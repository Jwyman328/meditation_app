import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'

const FetchProfileData = (token) => { 
        return async (dispatch) => {
            dispatch(LoadFetch('fetchUserDataLoading'))
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/get_profile_additional_data`,{
            headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}}).then(async(response) => {
                const responseData = await response.json()
                dispatch({type: 'FetchProfileData', ProfileData:responseData})
                dispatch(FetchSuccess('fetchUserDataSuccess'))
            }).catch(async(response) => {
                dispatch(FetchError('fetchUserDataError'))
            })
            
        }
}
export default FetchProfileData;