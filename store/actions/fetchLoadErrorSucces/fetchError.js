import react from 'react'

function FetchError(errorType){
    console.log('fetch error')
    console.log(errorType)
    return (dispatch) =>{
        dispatch({type:errorType})
    }
} 

export default FetchError