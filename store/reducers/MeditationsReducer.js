import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'



const initialState = {
    meditations: [], //dummyData, 
    filteredMeditations:[], //dummyData,
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
    },
    username : null,
    password: null, 
    token: null, 
    loggedIn: false,
    friendsList: [],
    allUsers:[],
    pendingFriendRequests: [],
    singleMessages:undefined,
    myFeelings: {  
        "depressed": 1,
        "anxious": 1,
        "lost": 1,
        "stressed": 1,
        "excited": 1},
    dailyStepGoal: 10000,
    moodPastWeek : undefined,
    moodPastMonth : undefined,
    moodDates : undefined,

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
                if (newFilters.testAnxietyFilter && meditation.catagories.includes(1) ){
                    return meditation
                }else{
                    //
                }

                if (newFilters.testDepressionFilter && meditation.catagories.includes(2) ){
                    return meditation
                }else{
                    //
                }

                if (newFilters.testBegginerFilter && meditation.catagories.includes(3) ){
                    return meditation
                }else{
                    //
                }

                if (newFilters.testAdvancedFilter && meditation.catagories.includes(4) ){
                    return meditation
                }else{
                    //
                }

                if (newFilters.testConfidenceFilter && meditation.catagories.includes(5) ){
                    return meditation
                }else{
                    //
                }
                const favoritedIdsArray = state.favoriteMeditations.map((item) => item.id)
                if (newFilters.testFavoriteFilter && state.favoriteMeditations && favoritedIdsArray.includes(meditation.id) ) {
                    // get a list of all the 
                        return meditation
                }else{
                    //
                }

            })}
            return {...state, filters: newFilters, filteredMeditations: newFilteredMeditations }

        case  'AddFavorite':
            // add and remove favorites
            let allMeditations = action.allMeditations

            return {...state, favoriteMeditations: action.allMeditations }
            break;

        case 'FetchAllCourses':
            //fetch all meditation courses
            return {...state,meditations: action.allMeditationCourses, filteredMeditations: action.allMeditationCourses }
            break;

        case 'FetchCourseData':
            return {...state, courseData: action.CourseData }
            break;

        case 'FetchFavorites':
            return {...state, favoriteMeditations: action.FavoriteData }
            break;

        case 'signIn':
            return {...state, username: action.username, password: action.password, token: action.token, loggedIn:true }
            break;
        
        case 'signUp':
                return {...state, username: action.userName, password: action.passWord, token: action.token, loggedIn: true }
                break;
        
        case 'logOut':
            // reset state to origin al empty state 

            return {...state, meditations: [], filteredMeditations:[],
                favoriteMeditations: [],courseData:[], 
                filters : {
                    testAnxietyFilter:false,
                    testDepressionFilter:false,
                    testBegginerFilter: false,
                    testAdvancedFilter:false,
                    testConfidenceFilter: false,
                    testFavoriteFilter:false,
                }, username : null,
                password: null, 
                token: null, 
                loggedIn: false,
                friendsList:[],
                allUsers: [],
                pendingFriendRequests:[],
                singleMessages:undefined,
                myFeelings:{  
                    "depressed": 1,
                    "anxious": 1,
                    "lost": 1,
                    "stressed": 1,
                    "excited": 1},
                    dailyStepGoal:10000, }
            
        case 'SetAudioState':
            const newAudioState = [...state.audioState]
            newAudioState[action.audioStateSetting] = !newAudioState[action.audioStateSetting] 
            return {...state,audioState:  newAudioState}

        case 'FetchUserFriends':
            const newFriendsList = action.friendsList
            return {...state, friendsList : newFriendsList}
        
        case 'FetchAllUsers':
            const newAllUsersList = action.allUsers
            return {...state, allUsers : newAllUsersList}

        case 'AddFriend':
            const newfriendsList = action.addFriendsList
            return {...state, friendsList : newfriendsList}
            break

        case 'PendingFriendRequests':
            const newPendingRequests = action.pendingFriendRequests
            return {...state, pendingFriendRequests:newPendingRequests }
        case 'FetchSingleUserMessages':
            const singleMessages = action.SingleMessages
            return {...state, singleMessages:singleMessages }
        
        case 'MyFeelings':
                const newFeelings = action.MyFeelings
                return{...state, myFeelings:newFeelings[0]}
                
        case 'changeMyFeeling':
            const myFeeling = action.feeling
            const newRating = action.newRating
            const newestFeelings = {...state.myFeelings}
           
            newestFeelings[myFeeling] = newRating
            return{...state, myFeelings:newestFeelings}

        case 'FetchDailyStepGoal':
            const myDailyStepGoal = action.dailyStepGoal
            return{...state, dailyStepGoal:myDailyStepGoal}

        case 'setNewStepGoal':
            const newDailyStepGoal = action.newDailyStepGoal
            return{...state, dailyStepGoal:newDailyStepGoal}

        case 'FetchMoodData':
            const newMoodData = action.MoodData
            const moodDataPastWeek = action.MoodData[0].moods_range[0]
            const moodDataPastMonth = action.MoodData[0].moods_range[1]
            const moodDataDates = action.MoodData[0].moods_range[2]   
            console.log({moodPastWeek:moodDataPastWeek ,moodPastMonth:moodDataPastMonth, moodDates: moodDataDates}) 
            return{...state, moodPastWeek:moodDataPastWeek ,moodPastMonth:moodDataPastMonth, moodDates: moodDataDates}
        


    }
  

    return state
}

export default MeditationsReducer