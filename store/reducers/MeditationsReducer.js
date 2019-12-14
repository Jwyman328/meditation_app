import FilterMeditations from '../actions/filterMeditations'

const initialState = {
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
            //console.log(newSwitchValue)
            const newFilters = {...state.filters}
            newFilters[action.filterName] = newSwitchValue
            return {...state, filters: newFilters }
    }
    return state
}

export default MeditationsReducer