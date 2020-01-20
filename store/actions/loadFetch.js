import react from 'react'

function LoadFetch(){
    console.log('loader')
    return (dispatch) =>{
        dispatch({type:'loadFetch'})
    }
} 

export default LoadFetch