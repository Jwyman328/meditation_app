import react from 'react'

function LoadFetch(loadType){
    console.log('loader')
    return (dispatch) =>{
        dispatch({type:loadType})
    }
} 

export default LoadFetch