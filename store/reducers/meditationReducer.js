import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'



const initialState = {
    meditations: [], //dummyData, 
    filteredMeditations: [], //dummyData,
    favoriteMeditations: [],
    courseData: [],
    filters: {
        testAnxietyFilter: false,
        testDepressionFilter: false,
        testBegginerFilter: false,
        testAdvancedFilter: false,
        testConfidenceFilter: false,
        testFavoriteFilter: false,
    },
    audioState: {
        isPlaying: false,
        playbackInstance: null,
        currentIndex: 0,
        volume: 1.0,
        isBuffering: true,
        isReady: false,
    },
    myFeelings: {
        "depressed": 1,
        "anxious": 1,
        "lost": 1,
        "stressed": 1,
        "excited": 1
    },
    fetchFeelingsLoading: false,
    fetchFeelingsError: false,
    fetchCoursesLoading: false,
    fetchCoursesError: false,

}

const MeditationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FilterMeditations':
            console.log('in new')
            let newSwitchValue = !state.filters[action.filterName]
            const newFilters = { ...state.filters }
            newFilters[action.filterName] = newSwitchValue
            let newFilteredMeditations = state.meditations

            // if all are false then no filters will be applied
            if (!newFilters.testAnxietyFilter && !newFilters.testDepressionFilter && !newFilters.testBegginerFilter
                && !newFilters.testAdvancedFilter && !newFilters.testConfidenceFilter && !newFilters.testFavoriteFilter) {
                //
            } else {
                newFilteredMeditations = state.meditations.filter(meditation => {
                    if (newFilters.testAnxietyFilter && meditation.catagories.includes(1)) {
                        return meditation
                    } else {
                        //
                    }

                    if (newFilters.testDepressionFilter && meditation.catagories.includes(2)) {
                        return meditation
                    } else {
                        //
                    }

                    if (newFilters.testBegginerFilter && meditation.catagories.includes(3)) {
                        return meditation
                    } else {
                        //
                    }

                    if (newFilters.testAdvancedFilter && meditation.catagories.includes(4)) {
                        return meditation
                    } else {
                        //
                    }

                    if (newFilters.testConfidenceFilter && meditation.catagories.includes(5)) {
                        return meditation
                    } else {
                        //
                    }
                    const favoritedIdsArray = state.favoriteMeditations.map((item) => item.id)
                    if (newFilters.testFavoriteFilter && state.favoriteMeditations && favoritedIdsArray.includes(meditation.id)) {
                        // get a list of all the 
                        return meditation
                    } else {
                        //
                    }

                })
            }
            return { ...state, filters: newFilters, filteredMeditations: newFilteredMeditations }

        case 'AddFavorite':
            console.log('in new')

            // add and remove favorites
            let allMeditations = action.allMeditations

            return { ...state, favoriteMeditations: action.allMeditations }
            break;

        case 'FetchAllCourses':
            //fetch all meditation courses
            return { ...state, meditations: action.allMeditationCourses, filteredMeditations: action.allMeditationCourses }
            break;

        case 'FetchCourseData':
            return { ...state, courseData: action.CourseData }
            break;

        case 'FetchFavorites':
            return { ...state, favoriteMeditations: action.FavoriteData }
            break;

        case 'logOut':
            // reset state to origin al empty state 

            return {
                ...state,
                meditations: [], //dummyData, 
                filteredMeditations: [], //dummyData,
                favoriteMeditations: [],
                courseData: [],
                filters: {
                    testAnxietyFilter: false,
                    testDepressionFilter: false,
                    testBegginerFilter: false,
                    testAdvancedFilter: false,
                    testConfidenceFilter: false,
                    testFavoriteFilter: false,
                },
                audioState: {
                    isPlaying: false,
                    playbackInstance: null,
                    currentIndex: 0,
                    volume: 1.0,
                    isBuffering: true,
                    isReady: false,
                },
                myFeelings: {
                    "depressed": 1,
                    "anxious": 1,
                    "lost": 1,
                    "stressed": 1,
                    "excited": 1
                },
                fetchFeelingsLoading: false,
                fetchFeelingsError: false,
                fetchCoursesLoading: false,
                fetchCoursesError: false,

            }

        case 'SetAudioState':
            const newAudioState = [...state.audioState]
            newAudioState[action.audioStateSetting] = !newAudioState[action.audioStateSetting]
            return { ...state, audioState: newAudioState }

        case 'MyFeelings':
            const newFeelings = action.MyFeelings
            return { ...state, myFeelings: newFeelings[0] }

        case 'changeMyFeeling':
            const myFeeling = action.feeling
            const newRating = action.newRating
            const newestFeelings = { ...state.myFeelings }

            newestFeelings[myFeeling] = newRating
            return { ...state, myFeelings: newestFeelings }

        case 'fetchFeelingsLoading':
            return {
                ...state,
                fetchFeelingsLoading: true,
                fetchFeelingsError: false,
            }

        case 'fetchFeelingsError':
            return {
                ...state,
                fetchFeelingsLoading: false,
                fetchFeelingsError: true,
            }
        case 'fetchFeelingsSuccess':
            return {
                ...state,
                fetchFeelingsLoading: false,
                fetchFeelingsError: false,
            }
        case 'fetchCoursesLoading':
            return {
                ...state,
                fetchCoursesLoading: true,
                fetchCoursesError: false,
            }
        case 'fetchCoursesError':
            return {
                ...state,
                fetchCoursesLoading: false,
                fetchCoursesError: true,
            }
        case 'fetchCoursesSuccess':
            return {
                ...state,
                fetchCoursesLoading: false,
                fetchCoursesError: false,
            }


    }
    return state
}


export default MeditationReducer