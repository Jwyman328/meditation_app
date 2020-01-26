import React from 'react'
import { useSelector } from 'react-redux';
import PostUserHealthData from '../actions/postUserHealthData'


/**
 * Logout the user.
 */
const SetUserHealthData = (healthDataType, healthDataValue, postData=false, newPostData=false, token=false) => {
    return async (dispatch) => {
    dispatch({type: 'setUserHealthData', healthDataType:healthDataType , healthDataValue:healthDataValue})
    if (postData){
        dispatch(PostUserHealthData(newPostData, token))
    }else{
        // dont post data
    }
    }
}

export default SetUserHealthData
