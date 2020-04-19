import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetForgotPasswordScreenState(navigation){
    const [userName, onChangeUserName] = React.useState('');

    //get reset password fetch status 
    const resetPasswordFetchError = useSelector(state => state.AuthData.resetPasswordFetchError)
    const resetPasswordFetchLoading = useSelector(state => state.AuthData.resetPasswordFetchLoading)
    const resetPasswordEmailSent = useSelector(state => state.AuthData.resetPasswordEmailSent)
    const resetPasswordLoading = useSelector(state => state.AuthData.resetPasswordLoading)

    return {userName,onChangeUserName,resetPasswordFetchError,resetPasswordFetchLoading,resetPasswordEmailSent,resetPasswordLoading  }
}

export default useGetForgotPasswordScreenState;