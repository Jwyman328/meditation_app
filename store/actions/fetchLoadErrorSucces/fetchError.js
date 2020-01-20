import react from 'react'

function FetchError(errorType){
    console.log('fetch error')
    return (dispatch) =>{
        dispatch({type:errorType})
    }
} 

export default FetchError