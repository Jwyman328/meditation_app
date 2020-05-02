import React from 'react'
/**
 * Add and remove courses from the filteredMeditations based on the selected filters.
 * @param {string} filterName the selected meditation course filter
 */
const FilterMeditations = (filterName) => {
    return(
        {type:'FilterMeditations', filterName:filterName}
    )
}

export default FilterMeditations