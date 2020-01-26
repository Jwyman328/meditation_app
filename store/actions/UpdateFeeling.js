import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const UpdateFeelings = (feelings, token) => { 
        return async (dispatch) => {
            delete feelings.id
            delete feelings.user
            let jsonFeelings = JSON.stringify(feelings)    
            const response = await axios({url:`http://intense-gorge-29567.herokuapp.com/personal/GetMyFeelings/`,
                method:'POST',data:jsonFeelings, headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.data
        }
}
export default UpdateFeelings