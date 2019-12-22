import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'

const fetchData = async() => {

    const response = await fetch('https://intense-gorge-29567.herokuapp.com/all_meditation_courses/')
    
    const responseData = await response.json()
    console.log(responseData[0].course_id, 'response data2')
    return 
}

const initialState = {
    meditations: [], //fetchData(), //dummyData, // courses
    filteredMeditations:[],// fetchData(),//dummyData,
    favoriteMeditations:[] ,
    courseData:[],
    filters : {
        testAnxietyFilter:false,
        testDepressionFilter:false,
        testBegginerFilter: false,
        testAdvancedFilter:false,
        testConfidenceFilter: false,
        testFavoriteFilter:false,
    },
    audioState : {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true,
		isReady: false,
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
                    return meditation
                }else{
                    //
                }

            })}
            return {...state, filters: newFilters, filteredMeditations: newFilteredMeditations }

        case  'AddFavorite':
            // add and remove favorites here
            {/*var newFavorites = [...state.favoriteMeditations]
            // check if the favorite already exists
            if (newFavorites.includes(action.courseId)){
                //if exists then remove it 
                newFavorites = newFavorites.filter(courseId =>  courseId !== action.courseId )
            }else{
                newFavorites.push(action.courseId)
            } */}
            //console.log(action.products, 'prop prop')
          
            return {...state,meditations: action.products, filteredMeditations: action.products }
            break;

        case 'FetchAllCourses':
            //fetch all meditation courses and set them as state 
            console.log(action.allMeditationCourses[0], 'whot')
            return {...state,meditations: action.allMeditationCourses, filteredMeditations: action.allMeditationCourses }
            break;

        case 'FetchCourseData':
                return {...state, courseData: action.CourseData }
                break;
    

        case 'SetAudioState':
            const newAudioState = [...state.audioState]
            newAudioState[action.audioStateSetting] = !newAudioState[action.audioStateSetting] 
            return {...state,audioState:  newAudioState}
    }
  

    return state
}

export default MeditationsReducer