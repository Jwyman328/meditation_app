import FilterMeditations from '../actions/meditation_actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {
    dailyStepGoal: 10000,
    currentStepCount: undefined,
    fetchDailyStepsLoading: false,
    fetchDailyStepsError: false,


}

const FitnessReducer = (state = initialState, action) => {
    switch (action.type) {


        case 'logOut':
            // reset state to origin al empty state 

            return {
                ...state,
                dailyStepGoal: 10000,
                currentStepCount: undefined,
                fetchDailyStepsLoading: false,
                fetchDailyStepsError: false,
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

        case 'fetchDailyStepsLoading':
            return {
                ...state,
                fetchDailyStepsLoading: true,
                fetchDailyStepsError: false
            }

        case 'fetchDailyStepsError':
            return {
                ...state,
                fetchDailyStepsLoading: false,
                fetchDailyStepsError: true
            }
        case 'fetchDailyStepsSuccess':
            return {
                ...state,
                fetchDailyStepsLoading: false,
                fetchDailyStepsError: false
            }




    }


    return state
}

export default FitnessReducer