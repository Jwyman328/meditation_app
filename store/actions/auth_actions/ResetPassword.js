import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import LoadFetch from '../fetchLoadErrorSucces/loadFetch'
import FetchSuccess from '../fetchLoadErrorSucces/fetchSuccess'
import FetchError from '../fetchLoadErrorSucces/fetchError'


const ResetPassword = (username) => { 
        return async (dispatch) => {
            dispatch(LoadFetch('resetPasswordLoading'))
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/resetPassword/${username}/`,{
            headers:{ 'Content-Type': 'application/json'}}).then(async(response) => {
                const responseData = await response.json()
                if (responseData === 'email does not exist'){
                    dispatch(FetchError('resetPasswordFetchError'))
                }else{
                    dispatch(FetchSuccess('resetPasswordSuccess'))
                }
            }).catch(async(response) => {
                dispatch(FetchError('resetPasswordFetchError'))
            })


        }
}
export default ResetPassword