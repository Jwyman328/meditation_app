import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../../store/actions/setUserHealthData'

/**
 * Update DOB profile data and post all user health data to database.
 * 
 * If this is part of the signup process navigate the user to the pass in screenToNavigateTo.
 * Else, navigate the user back to the ProfileDataScreen.
 * 
 * @param {number} monthChoosen initial birth month choosen
 * @param {number} yearChoosen initial birth month choosen
 * @param {object} healthData all health data including, gender, height and weight.
 * @param {string} token jwt token for making post request.
 * @param {function} navigator function to navigate.
 * @param {function} dispatch function to dispatch action
 */

const postAllUserHealthData = (isInSignUpProcess, monthChoosen, yearChoosen, healthData,
     token, dispatch, navigator, screenToNavigateTo) => {
    dispatch(SetUserHealthData('DOB', { month: monthChoosen, year: yearChoosen }, true, healthData, token))

    if (isInSignUpProcess) {
        navigator(screenToNavigateTo, { firstTime: true })
    }else{
        navigator('ProfileDataScreen')
    }
}

export default postAllUserHealthData;
