import react from 'react'

function FetchSuccess(successType){
    return (dispatch) =>{
        dispatch({type:successType})
    }
} 

export default FetchSuccess