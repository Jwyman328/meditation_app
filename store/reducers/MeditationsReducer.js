import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'

const initialState = {
    meditations:dummyData,
    filteredMeditations: dummyData,
    favoriteMeditations:[] ,
    filters : {
        testAnxietyFilter:false,
        testDepressionFilter:false,
        testBegginerFilter: false,
        testAdvancedFilter:false,
        testConfidenceFilter: false,
        testFavoriteFilter:false,
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
                && !newFilters.testAdvancedFilter && !newFilters.testConfidenceFilter && !newFilters.testFavoriteFilter ){
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

                if (newFilters.testFavoriteFilter && state.favoriteMeditations.includes(meditation.courseId)  ){
                    console.log(state.favoriteMeditations, meditation.courseId)
                    return meditation
                }else{
                    //
                }

            })}

            console.log(newFilteredMeditations.length)
            return {...state, filters: newFilters, filteredMeditations: newFilteredMeditations }

        case  'AddFavorite':
            // add and remove favorites here
            console.log(action.courseId)
            var newFavorites = [...state.favoriteMeditations]
            // check if the favorite already exists
            if (newFavorites.includes(action.courseId)){
                //if exists then remove it 
                newFavorites = newFavorites.filter(courseId =>  courseId !== action.courseId )
                console.log(newFavorites)
            }else{
                newFavorites.push(action.courseId)
                console.log(newFavorites)
            }
          
            return {...state,favoriteMeditations: newFavorites }
            break;
    }
  

    return state
}

export default MeditationsReducer