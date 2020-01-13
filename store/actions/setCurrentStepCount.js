import React from 'react'


/**
 * Logout the user.
 */
const currentStepCount = (currentStepCount) => {
    return async (dispatch) => {
    dispatch({type: 'setCurrentSteps', currentSteps:currentStepCount})

    }
}

export default currentStepCount
