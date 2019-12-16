import React from 'react'

const AddFavorite = (courseId) => {
    return(
        {type:'AddFavorite', courseId:courseId}
    )
}

export default AddFavorite