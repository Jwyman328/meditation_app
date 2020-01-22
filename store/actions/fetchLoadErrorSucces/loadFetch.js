import react from 'react'

function LoadFetch(loadType){
    return (dispatch) =>{
        dispatch({type:loadType})
    }
} 

export default LoadFetch