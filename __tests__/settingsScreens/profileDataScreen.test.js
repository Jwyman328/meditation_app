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

import ProfileDataScreen  from '../../screens/SettingsScreens/ProfileDataScreen'
import handleInitialState from '../../testStateManager/stateManager'
import moxios from 'moxios'

let element;
let navigation;
let rootReducers;
let store;

import InitialState from '../../testStateManager/screenStates/profileDataScreenInitialState'
//const InitialStateMessagesError = handleInitialState(InitialState,'FriendsAndMsgs', [{"fetchSingleMessagesError":true}])


describe('Fetch profile Data success', () => {
    beforeEach(() => {
      rootReducers = combineReducers({
        meditation: MeditationReducer,
        Fitness: FitnessReducer,
        ProfileData: ProfileDataReducer,
        FriendsAndMsgs: FriendsAndMsgsReducer,
        AuthData: AuthDataReducer,
        Mood: MoodReducer,
      })
      //moxios for logout button
      //moxios.install()
      //moxios.stubRequest( `http://intense-gorge-29567.herokuapp.com/friends/message_history/test_user_1/`,{status:200, response: [],})
     
      navigation = { navigate: jest.fn() };
      store = createStore(rootReducers, InitialState , applyMiddleware(ReduxThunk)) //logger
      element = render(<Provider store={store}>   <ProfileDataScreen navigation={navigation} /> </Provider>)
    })
    test('profile data title shows', () => {
        const {getByTestId} = element;
        const titleTextElement = getByTestId('profileTitle')
        expect(titleTextElement.props['children']).toBe('Profile Data')
    })

    test('First Name shows', () => {
        const {getByTestId} = element;
        const firstNameTitleElement = getByTestId('firstNameTitle')
        const firstNameElement = getByTestId('firstName')
        expect(firstNameElement.props['children']).toBe('testUserFirstName')
        expect(firstNameTitleElement.props['children']).toBe('First Name')
    })

    test('Last Name shows', () => {
        const {getByTestId} = element;
        const lastNameTitleElement = getByTestId('lastNameTitle')
        const lastNameElement = getByTestId('lastName')
        expect(lastNameElement.props['children']).toBe('testUserLastName')
        expect(lastNameTitleElement.props['children']).toBe('Last Name')
       
    })

    test('Weight shows', () => {
        const {getByTestId} = element;
        const weightTitleElement = getByTestId('WeightTitle')
        const weightElement = getByTestId('weight')

        expect(weightTitleElement.props['children']).toBe('Weight')
        expect(weightElement.props['children']).toEqual([197, "lbs"])
    })
    
    test('Height shows', () => {
        const {getByTestId} = element;
        const heightTitleElement = getByTestId('heightTitle')
        const heightElement = getByTestId('height')

        expect(heightTitleElement.props['children']).toBe('Height')
        expect(heightElement.props['children']).toEqual([8, "ft ", 7, "in "])
    })

    test('DOB shows', () => {
        const {getByTestId} = element;
        const DOBTitleElement = getByTestId('DOBTitle')
        const DOBElement = getByTestId('DOB')

        expect(DOBTitleElement.props['children']).toBe('D.O.B')
        expect(DOBElement.props['children']).toEqual([10, '/', 1996])
    })

    test('gender shows', () => {
        const {getByTestId} = element;
        const genderTitleElement = getByTestId('genderTitle')
        const genderElement = getByTestId('gender')

        expect(genderTitleElement.props['children']).toBe('Sex')
        expect(genderElement.props['children']).toEqual('Female')
    })


    test('fitness Goals show', () => {
        const {getByTestId} = element;
        const goalsTitleElement = getByTestId('goalsTitle')
        const dailyStepsTitleElement = getByTestId('dailyStepsTitle')
        const dailyStepsCount = getByTestId('dailyStepCount')

        expect(goalsTitleElement.props['children']).toBe('Goals')
        expect(dailyStepsTitleElement.props['children']).toEqual('Daily Steps')
        expect(dailyStepsCount.props['children']).toEqual(3005)

    })

    test('logOut button exists', () => {
        const {getByTestId} = element;
        const logOutButton = getByTestId('logOutButton')
        expect(logOutButton.props.title).toBe('logout')


    })
})