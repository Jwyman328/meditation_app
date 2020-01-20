import react from 'react'

function FetchError(){
    console.log('fetch error')
    return (dispatch) =>{
        dispatch({type:'fetchError'})
    }
} 

export default FetchError