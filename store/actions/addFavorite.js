import React from 'react'
/**
 * Add the selected course to the array of favorite courses
 * @param {string} courseId the id for the course
 */
const getFavorites = (courseId) => {getFavorites
    return async (dispatch) => {

    const response = await fetch('https://test-rn-1-875d5.firebaseio.com/products.json', {
        method:'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify( {
            courseId:  courseId
        })
    }
    
    )
    const responseData = await response.json()
    console.log(responseData, 'response data')

        dispatch({type:'AddFavorite', courseId:courseId})
    }
}

const AddFavorite = (courseId) => {
    return async (dispatch) => {

    const response = await fetch('https://intense-gorge-29567.herokuapp.com/all_meditation_courses/')
    const responseData = await response.json()
    dispatch({type: 'AddFavorite', products:responseData})
    }
}

const AddFavorite2 = (courseId) => { //Original
    return(
        {type:'AddFavorite', courseId:courseId}
    )
}




export default AddFavorite2