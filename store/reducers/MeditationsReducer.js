import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'

const initialState = {
    meditations:dummyData,
    filteredMeditations: dummyData,
    filters : {
        testAnxietyFilter:false,
        testDepressionFilter:false,
        testBegginerFilter: false,
        testAdvancedFilter:false,
        testConfidenceFilter: false,
    }
}

const MeditationsReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FilterMeditations':
            let newSwitchValue = !state.filters[action.filterName]
            const newFilters = {...state.filters}
            newFilters[action.filterName] = newSwitchValue
            let newFilteredMeditations = state.meditations
            // if all are false then no filters will be applied
            if ( !newFilters.testAnxietyFilter && !newFilters.testDepressionFilter && !newFilters.testBegginerFilter
                && !newFilters.testAdvancedFilter && !newFilters.testConfidenceFilter ){
                    //
            }else{
                newFilteredMeditations = state.meditations.filter(meditation => {
                if (newFilters.testAnxietyFilter && meditation.catagories.includes('anxiety') ){
                    return meditation
                }else{
                    //
                }

                if (newFilters.testDepressionFilter && meditation.catagories.includes('depression') ){
                    return meditation
                }else{
                    //
                }

                if (newFilters.testBegginerFilter && meditation.catagories.includes('begginer') ){
                    return meditation
                }else{
                    //
                }

                if (newFilters.testAdvancedFilter && meditation.catagories.includes('expert') ){
                    return meditation
                }else{
                    //
                }


                if (newFilters.testConfidenceFilter && meditation.catagories.includes('confidence') ){
                    return meditation
                }else{
                    //
                }

            })}

            console.log(newFilteredMeditations.length)
            return {...state, filters: newFilters, filteredMeditations: newFilteredMeditations }
    }

    return state
}

export default MeditationsReducer