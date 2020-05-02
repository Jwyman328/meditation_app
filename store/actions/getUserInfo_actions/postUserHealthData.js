import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

/**
 * Post profile healthData (height, weight, sex, DOB).
 * 
 * @param {Object} healthData new profile healthData to replace previous profile health data.
 * @param {String} token jwt token to make post request.
 */
const PostUserHealthData = ( healthData, token) => { 
        return async (dispatch) => {
            let jasonHealthData = JSON.stringify(healthData)
            const response = await fetch(`http://intense-gorge-29567.herokuapp.com/sign_up_set_health_additional_data`,{
                method:'POST',body:jasonHealthData, headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.json()
        }
}
export default PostUserHealthData