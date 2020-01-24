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
        const titleTextElement = getByTestId('TitleProfile Data')
        expect(titleTextElement.props['children']).toBe('Profile Data')
    })

    test('First Name shows', () => {
        const {getByTestId} = element;
        const firstNameTitleElement = getByTestId('labelFirst Name')
        const firstNameElement = getByTestId('valuetestUserFirstName')
        expect(firstNameElement.props['children']).toBe('testUserFirstName')
        expect(firstNameTitleElement.props['children']).toBe('First Name')
    })

    test('Last Name shows', () => {
        const {getByTestId} = element;
        const lastNameTitleElement = getByTestId('labelLast Name')
        const lastNameElement = getByTestId('valuetestUserLastName')
        expect(lastNameElement.props['children']).toBe('testUserLastName')
        expect(lastNameTitleElement.props['children']).toBe('Last Name')
       
    })

    test('Weight shows', () => {
        const {getByTestId} = element;
        const weightTitleElement = getByTestId('labelWeight')
        const weightElement = getByTestId('value197lbs')

        expect(weightTitleElement.props['children']).toBe('Weight')
        expect(weightElement.props['children']).toEqual('197lbs')
    })
    
    test('Height shows', () => {
        const {getByTestId} = element;
        const heightTitleElement = getByTestId('labelHeight')
        const heightElement = getByTestId('value8ft 7in')

        expect(heightTitleElement.props['children']).toBe('Height')
        expect(heightElement.props['children']).toEqual('8ft 7in')
    })

    test('DOB shows', () => {
        const {getByTestId} = element;
        const DOBTitleElement = getByTestId('labelD.O.B')
        const DOBElement = getByTestId('value10/1996')

        expect(DOBTitleElement.props['children']).toBe('D.O.B')
        expect(DOBElement.props['children']).toEqual('10/1996')
    })

    test('gender shows', () => {
        const {getByTestId} = element;
        const genderTitleElement = getByTestId('labelSex')
        const genderElement = getByTestId('valueFemale')

        expect(genderTitleElement.props['children']).toBe('Sex')
        expect(genderElement.props['children']).toEqual('Female')
    })


    test('fitness Goals show', () => {
        const {getByTestId} = element;
        const goalsTitleElement = getByTestId('TitleGoals')
        const dailyStepsTitleElement = getByTestId('labelDaily Steps')
        const dailyStepsCount = getByTestId('value3005')

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