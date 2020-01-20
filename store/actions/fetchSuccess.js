import react from 'react'

function FetchSuccess(){
    return (dispatch) =>{
        dispatch({type:'fetchSuccess'})
    }
} 

export default FetchSuccess