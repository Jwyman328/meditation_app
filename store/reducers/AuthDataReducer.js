import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {
   
    username : null,
    password: null, 
    token: null, 
    loggedIn: false,
    

}

const AuthDataReducer = (state=initialState, action) => {
    switch(action.type){

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
                    dailyStepGoal:10000,
                    currentStepCount:0,
                    userHealthData:undefined,
                    generalUserData:undefined,
                 }
    }
  

    return state
}

export default AuthDataReducer