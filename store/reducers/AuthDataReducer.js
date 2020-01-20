import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {

    username: null,
    password: null,
    token: null,
    loggedIn: false,
    logInfetchError: false,
    logInfetchLoading: false,
    signUpFetchError: false,
    signUpFetchLoading: false,

}

const AuthDataReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'signIn':
            return { ...state, username: action.username, password: action.password, token: action.token, loggedIn: true }
            break;

        case 'signUp':
            return { ...state, username: action.userName, password: action.passWord, token: action.token, loggedIn: true }
            break;

        case 'logOut':
            // reset state to origin al empty state 

            return {
                ...state, username: null,
                password: null,
                token: null,
                loggedIn: false,
                logInfetchError: false,
                logInfetchLoading: false,
                signUpFetchError: false,
                signUpFetchLoading: false,

            }
        case 'logInloadFetch':
            return { ...state, logInfetchLoading: true, logInfetchError: false }

        case 'logInfetchError':
            return { ...state, logInfetchLoading: false, logInfetchError: true }

        case 'logInfetchSuccess':
            return { ...state, logInfetchLoading: false, logInfetchError: false }

        case 'signUpFetchLoading':
            return { ...state, signUpFetchLoading: true, signUpFetchError: false }

        case 'signUpFetchError':
            return { ...state, signUpFetchLoading: false, signUpFetchError: true }

        case 'signUpFetchSuccess':
            return { ...state, signUpFetchLoading: false, signUpFetchError: false }

    }


    return state
}

export default AuthDataReducer