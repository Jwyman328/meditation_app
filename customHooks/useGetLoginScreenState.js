import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetLoginScreenState(){
    const [loginFail, setLoginFail] = React.useState(undefined);
    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');

    const dispatch = useDispatch()

    const token = useSelector((state) => state.AuthData.token)
    const username = useSelector((state) => state.AuthData.username)

    //get login fetch status
    const fetchLoading = useSelector((state) => state.AuthData.logInfetchLoading)
    const fetchError = useSelector((state) => state.AuthData.logInfetchError)
    
    return {loginFail, setLoginFail,userName, onChangeUserName,passWord, onChangePassword,dispatch,token,username,fetchLoading,fetchError }


}

export default useGetLoginScreenState;