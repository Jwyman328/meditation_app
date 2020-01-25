import react from 'react'

function FetchError(errorType){
    return (dispatch) =>{
        dispatch({type:errorType})
    }
} 

export default FetchError