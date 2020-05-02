import React from 'react'

import SetUserHealthData from '../../../store/actions/getUserInfo_actions/setUserHealthData'
/**
 * Update internal profileDataCatagory with new dataValue inside redux state.
 * 
 * The profileData will not be posted untill signUp process is complete.
 * 
 * @param {String} profileDataCatagory the specific profile data catagory being updated. 
 * @param {Any} dataValue new value of the profileDataCatagory. 
 */
const setProfileDataInternalState = (profileDataCatagory, dataValue,dispatch ) => {
    dispatch(SetUserHealthData(profileDataCatagory, dataValue))
}

/**
 * Post profile health data update to database.
 * 
 * @param {String} profileDataCatagory the specific profile data catagory being updated. 
 * @param {Any} dataValue new value of the profileDataCatagory. 
 * @param {Object} allHealthData the entire healthData object containing, weight,height,DOB and sex. 
 * @param {String} token jwt token for making request. 
 * @param {Function} dispatch dispatcher to update redux state. 
 */
const postUpdateOfProfileData = (profileDataCatagory, dataValue,allHealthData, token, dispatch) => {
    dispatch(SetUserHealthData(profileDataCatagory, dataValue, true, allHealthData, token))
}


/**
 * Update profileData, if the user is in the signUpProcess only set data to Initial State else post to database.
 * 
 * After updating profileData navigate the user forward in the signUp process or back to the profile data screen.
 * 
 * @param {String} profileDataCatagory the specific profile data catagory being updated.
 * @param {Any} dataValue new value of the profileDataCatagory.
 * @param {Object} allHealthData the entire healthData object containing, weight,height,DOB and sex.
 * @param {String} token jwt token for making request.
 * @param {Boolean} isInSignupProcess deciding if the user is in the signUp process.
 * @param {Function} navigator to navigate to next screen.
 * @param {String} nextSignUpScreen next screen to navigate to if the user is in the signup process.
 * @param {Function} dispatch dispatcher to update redux state.
 */
const postOrUpdateProfileData = (profileDataCatagory, dataValue, allHealthData,
    token, isInSignupProcess, navigator, nextSignUpScreen, dispatch) => {
    if (isInSignupProcess) {
        setProfileDataInternalState(profileDataCatagory, dataValue, dispatch)
        navigator(nextSignUpScreen, { firstTime: isInSignupProcess })
    } else {
        postUpdateOfProfileData(profileDataCatagory, dataValue,allHealthData, token, dispatch)
        navigator('ProfileDataScreen')
    }
}

export default postOrUpdateProfileData;