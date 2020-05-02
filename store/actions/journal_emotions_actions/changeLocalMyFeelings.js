import React from 'react'


const changeLocalMyFeelings = (feeling,newRating) => {
    return async (dispatch) => {
    
    dispatch({type: 'changeMyFeeling', feeling:feeling, newRating:newRating})
    }
}

export default changeLocalMyFeelings