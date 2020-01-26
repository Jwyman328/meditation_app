import React from 'react';
import { render, fireEvent, waitForElement } from 'react-native-testing-library';
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from '../../store/reducers/FitnessReducer'
import MeditationReducer from '../../store/reducers/meditationReducer'
import ProfileDataReducer from '../../store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from '../../store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from '../../store/reducers/AuthDataReducer'
import MoodReducer from '../../store/reducers/MoodReducer'

import IntroToQuestionsScreen from '../../screens/GetUserInfoStack/IntroToQuestionsScreen'

let element;
let navigation;
let rootReducers;
let store;

import InitialState from '../../testStateManager/screenStates/profileDataScreenInitialState'
//const InitialStateMessagesError = handleInitialState(InitialState,'FriendsAndMsgs', [{"fetchSingleMessagesError":true}])


describe('Set up initial state', () => {
    beforeEach(() => {
      rootReducers = combineReducers({
        meditation: MeditationReducer,
        Fitness: FitnessReducer,
        ProfileData: ProfileDataReducer,
        FriendsAndMsgs: FriendsAndMsgsReducer,
        AuthData: AuthDataReducer,
        Mood: MoodReducer,
      })
      navigation = { navigate: jest.fn() };
      store = createStore(rootReducers, InitialState , applyMiddleware(ReduxThunk)) //logger
      element = render(<Provider store={store}>   <IntroToQuestionsScreen navigation={navigation} /> </Provider>)
    })
    test('Welcome message shows', () => {
        const {getByTestId} = element;
        const titleTextElement = getByTestId('welcomeMsg')
        expect(titleTextElement.props['children']).toBe('To better understand your health needs, please tell us a few things about yourself.')
    })
    test('Button navigates to gender screen', async() => {
        const {getByTestId} = element;
        const continueButton = getByTestId('continueButton')
        fireEvent(continueButton, 'onPress')
        const navigationElement = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("chooseGender", {"firstTime": true}) )
    })

})