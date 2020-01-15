import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {
   
    
    dailyStepGoal: 10000,
    currentStepCount: undefined,


}

const FitnessReducer = (state=initialState, action) => {
    switch(action.type){

        
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
                    dailyStepGoal:10000,
                    currentStepCount:0,
                    userHealthData:undefined,
                    generalUserData:undefined,
                 }

        case 'FetchDailyStepGoal':
            const myDailyStepGoal = action.dailyStepGoal
            return{...state, dailyStepGoal:myDailyStepGoal}

        case 'setNewStepGoal':
            const newDailyStepGoal = action.newDailyStepGoal
            return{...state, dailyStepGoal:newDailyStepGoal}

        case 'setCurrentSteps':
            const newCurrentStepCount = action.currentSteps
            return{...state, currentStepCount:newCurrentStepCount}  
        
    }
  

    return state
}

export default FitnessReducer