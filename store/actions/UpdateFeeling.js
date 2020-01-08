import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

const UpdateFeelings = (feelings, token) => { 
        return async (dispatch) => {

            delete feelings.id
            delete feelings.user
            let jsonFeelings = JSON.stringify(feelings)    
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/personal/GetMyFeelings/`,{
                method:'POST',body:jsonFeelings, headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()

        }
}
export default UpdateFeelings