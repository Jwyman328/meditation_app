import React from 'react'
/**
 * Add the selected course to the array of favorite courses
 * @param {string} courseId the id for the course
 */
const AddFavorite = (courseId) => {
    return(
        {type:'AddFavorite', courseId:courseId}
    )
}

export default AddFavorite