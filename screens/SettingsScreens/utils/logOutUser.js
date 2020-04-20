import React from 'react'
import {disptach, useDispatch} from 'react-redux';
import LogOutUser from '../../../store/actions/logOut'

    /**
     * Log out user.
     * Navigate to login screen.
     */
    function logOutUser(navigation, dispatch){
        navigation.navigate('Auth')
        dispatch(LogOutUser())
    }

    export default logOutUser;