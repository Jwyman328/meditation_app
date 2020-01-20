import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {
    dailyStepGoal: 10000,
    currentStepCount: undefined,
    

}

const FitnessReducer = (state = initialState, action) => {
    switch (action.type) {


        case 'logOut':
            // reset state to origin al empty state 

            return {...state,
                dailyStepGoal: 10000,
                currentStepCount: undefined,
            }

        case 'FetchDailyStepGoal':
            const myDailyStepGoal = action.dailyStepGoal
            return { ...state, dailyStepGoal: myDailyStepGoal }

        case 'setNewStepGoal':
            const newDailyStepGoal = action.newDailyStepGoal
            return { ...state, dailyStepGoal: newDailyStepGoal }

        case 'setCurrentSteps':
            const newCurrentStepCount = action.currentSteps
            return { ...state, currentStepCount: newCurrentStepCount }

    }


    return state
}

export default FitnessReducer