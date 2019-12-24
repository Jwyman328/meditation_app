import React from 'react'


/**
 * Logout the user.
 */
const LogOutUser = () => {
    return async (dispatch) => {
    dispatch({type: 'logOut'})

    }
}

export default LogOutUser

