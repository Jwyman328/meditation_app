import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'
import axios from 'axios'

const FetchAllUsers = (token) => {
    return async (dispatch) => {
        dispatch(LoadFetch('fetchUsersLoading'))
        const response = await axios(`http://intense-gorge-29567.herokuapp.com/all_users`, {
            headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' }
        }).then(async (response) => {
            if (response.status == 404){
                dispatch(FetchError('fetchUsersError'))
            }else{
                dispatch(FetchSuccess('fetchUsersSuccess'))
                const responseData = await response.data
                dispatch({ type: 'FetchAllUsers', allUsers: responseData })
            }
        }).catch((response) => {
            dispatch(FetchError('fetchUsersError'))
        })
    }
}
export default FetchAllUsers;