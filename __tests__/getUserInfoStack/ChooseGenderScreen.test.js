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

import ChooseGenderScreen from '../../screens/GetUserInfoStack/chooseGenderScreen'

let element;
let navigation;
let rootReducers;
let store;

import InitialState from '../../testStateManager/screenStates/profileDataScreenInitialState'

describe('Not first time initial setup of profile data', () => {
    beforeEach(() => {
      rootReducers = combineReducers({
        meditation: MeditationReducer,
        Fitness: FitnessReducer,
        ProfileData: ProfileDataReducer,
        FriendsAndMsgs: FriendsAndMsgsReducer,
        AuthData: AuthDataReducer,
        Mood: MoodReducer,
      })
      navigation = { navigate: jest.fn(), getParam: jest.fn(() => false) };
      store = createStore(rootReducers, InitialState , applyMiddleware(ReduxThunk)) //logger
      element = render(<Provider store={store}><ChooseGenderScreen navigation={navigation} /> </Provider>)
    })
    test('Welcome message shows', () => {
        const {getByTestId} = element;
        const titleTextElement = getByTestId('title')
        expect(titleTextElement.props['children']).toBe("What's Your Sex?")
    })
    test('Button navigates to back to ProfileDataScreen', async() => {
        const {getByTestId} = element;
        const continueButton = getByTestId('continueButton')
        fireEvent(continueButton, 'onPress')
        const navigationElement = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("ProfileDataScreen") )
    })

    test('Change gender value from female to male changes male and female color', () => {
        const {getByTestId} = element;
        const maleButton = getByTestId('chooseMaleButton')
        const maleIcon = getByTestId('maleIcon')
        const femaleIcon = getByTestId('femaleIcon')
        //to start male is not choosen
        expect(maleIcon.props.color).toBe('grey')
        expect(femaleIcon.props.color).toBe('#7796CB')
        fireEvent(maleButton, 'onPress')
        //after press maleIcon is choosen color
        expect(maleIcon.props.color).toBe('#7796CB')
        expect(femaleIcon.props.color).toBe('grey')
        
    })
    test('Change gender value from female to male changes male and female icon colors', () => {
        const {getByTestId} = element;
        const maleIcon = getByTestId('maleIcon')
        const femaleButton = getByTestId('chooseFemaleButton')
        const femaleIcon = getByTestId('femaleIcon')
        //to start male is not choosen
        expect(maleIcon.props.color).toBe('#7796CB')
        expect(femaleIcon.props.color).toBe('grey')
        fireEvent(femaleButton, 'onPress')
        //after press maleIcon is choosen color
        expect(maleIcon.props.color).toBe('grey')
        expect(femaleIcon.props.color).toBe('#7796CB')
    })
})

describe('First time initial setup of profile data', () => {
    beforeEach(() => {
      rootReducers = combineReducers({
        meditation: MeditationReducer,
        Fitness: FitnessReducer,
        ProfileData: ProfileDataReducer,
        FriendsAndMsgs: FriendsAndMsgsReducer,
        AuthData: AuthDataReducer,
        Mood: MoodReducer,
      })
      navigation = { navigate: jest.fn(), getParam: jest.fn(() => true) };
      store = createStore(rootReducers, InitialState , applyMiddleware(ReduxThunk)) //logger
      element = render(<Provider store={store}><ChooseGenderScreen navigation={navigation} /> </Provider>)
    })

    test('Button navigates to back forward to ChooseWeightScreen', async() => {
        const {getByTestId} = element;
        const continueButton = getByTestId('continueButton')
        fireEvent(continueButton, 'onPress')
        const navigationElement = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("ChooseWeight", {"firstTime": true}) )
    })

})