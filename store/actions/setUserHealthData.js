import React from 'react'


/**
 * Logout the user.
 */
const SetUserHealthData = (healthDataType, healthDataValue) => {
    return async (dispatch) => {
    dispatch({type: 'setUserHealthData', healthDataType:healthDataType , healthDataValue:healthDataValue})

    }
}

export default SetUserHealthData
