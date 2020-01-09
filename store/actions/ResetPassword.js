import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

const ResetPassword = (username) => { 
        return async (dispatch) => {
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/resetPassword/${username}/`,{
            headers:{ 'Content-Type': 'application/json'}})
            const responseData = await response.json()


        }
}
export default ResetPassword