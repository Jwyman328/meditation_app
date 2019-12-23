import React from 'react'



const LogOutUser = () => {
    return async (dispatch) => {
   console.log('entered log out ')
    dispatch({type: 'logOut'})

    }
}

export default LogOutUser

