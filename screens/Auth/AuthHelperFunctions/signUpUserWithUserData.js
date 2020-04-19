import React from 'react'
import SignUpUser from '../../../store/actions/signUpUser'
import { useDispatch, useSelector } from "react-redux";

    /**
     * Check password one and two are equal and attempt to signUp user.
     */
    function signUpUserWithUserData(passWord,passWordTwo,userName,firstName,lastName, dispatch){
        if (passWord === passWordTwo) {
            dispatch(SignUpUser(userName, passWord, firstName, lastName))
        } else {
            console.log('passwords do not match')
        }
    }

export default signUpUserWithUserData;