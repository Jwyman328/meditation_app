import React from 'react';
import { render, fireEvent, waitForElement } from 'react-native-testing-library';
import NewMessageForm from '../../Hello';
import { Updates } from 'expo';
import ReduxThunk from 'redux-thunk'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from '../../store/reducers/FitnessReducer'
import MeditationReducer from '../../store/reducers/meditationReducer'
import ProfileDataReducer from '../../store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from '../../store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from '../../store/reducers/AuthDataReducer'
import MoodReducer from '../../store/reducers/MoodReducer'
import moxios from 'moxios'


import LoginScreen from '../../screens/Auth/LogInScreen'

let rootReducers;
let store;
let element;
let email;
let password;
describe('Unit test input boxes', () => {
    beforeEach(() => {
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        store = createStore(rootReducers, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store}>   <LoginScreen /></Provider>);
    })
    test('login username', () => {

        const { update, getByPlaceholder } = element;
        const email = getByPlaceholder('email')
        fireEvent(email, 'onChangeText', 'footballjoe328@gmail.com')
        //expect(email.props.value).toEqual('footballjoe328@gmail.com')
    })

    test('login password', () => {
        const { update, getByPlaceholder } = element;
        const password = getByPlaceholder('password')
        fireEvent(password, 'onChangeText', 'newPassword')
        //expect(password.props.value).toEqual('newPassword')
    })

    test('user gets logged in username password reset to empty string ', () => {
        const { update, getByTestId, getByPlaceholder } = element;

        //add user name 
        let email = getByPlaceholder('email')
        fireEvent(email, 'onChangeText', 'footballjoe328@gmail.com')
        //expect(email.props.value).toEqual('footballjoe328@gmail.com')

        //add password
        let password = getByPlaceholder('password')
        fireEvent(password, 'onChangeText', 'newPassword')
        expect(password.props.value).toEqual('newPassword')

        //click logIn button
        const loginScreenButton = getByTestId('loginUser')
        fireEvent(loginScreenButton, 'onPress')

    })
})

let navigation;
describe('Post request successful', () => {
    beforeEach(() => {
        //set mocking of sign in request
        moxios.install()
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/sign_in`, { status: 200, response: { token: 'myToken' }, })
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, { token: false }, applyMiddleware(ReduxThunk))

        element = render(<Provider store={store}>   <LoginScreen navigation={navigation} /></Provider>)
        //set loginData
        const { update, getByTestId, getByPlaceholder } = element
        email = getByPlaceholder('email')
        fireEvent(email, 'onChangeText', 'footballjoe328@gmail.com')
        //add password
        password = getByPlaceholder('password')
        fireEvent(password, 'onChangeText', 'newPassword')
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('Post request returns token and navigates user to homeScreen', async() => {
        const { getByTestId, getByPlaceholder } = element

        //click logIn button
        const loginScreenButton = getByTestId('loginUser')
        fireEvent(loginScreenButton, 'onPress')
        const navigationElement = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith('Tabs') )
    })
})

describe('Failed post request user does not exist',() => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/sign_in`, { status: 200, response: { token: false }, })
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, { token: false }, applyMiddleware(ReduxThunk))

        // Add in login Data 
        element = render(<Provider store={store}>   <LoginScreen navigation={navigation} /></Provider>)
        //set loginData
        const { update, getByTestId, getByPlaceholder } = element
        email = getByPlaceholder('email')
        fireEvent(email, 'onChangeText', 'footballjoe328@gmail.com')
        //add password
        password = getByPlaceholder('password')
        fireEvent(password, 'onChangeText', 'newPassword')
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('Fail post request shows error message', async() => {
        const { update, getByTestId, getByPlaceholder } = element

        //click logIn button
        const loginScreenButton = getByTestId('loginUser')
        fireEvent(loginScreenButton, 'onPress')

        const logInErrorMSG = await waitForElement(() => getByTestId('loginError'))
        expect(logInErrorMSG.props['children']).toBe('Username or password is invalid')
            })
    test('Fail post request does not navigtate to homescreen', async() => {
        const { update, getByTestId, getByPlaceholder } = element
        
        //click logIn button
        const loginScreenButton = getByTestId('loginUser')
        fireEvent(loginScreenButton, 'onPress')

        const navigationElement = await waitForElement(() => expect(navigation.navigate.mock.calls.length).toEqual(0))
    })

})
