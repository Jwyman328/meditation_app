import React from 'react';
import { render, fireEvent, waitForElement } from 'react-native-testing-library';
import ReduxThunk from 'redux-thunk'


import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from '../../store/reducers/FitnessReducer'
import MeditationReducer from '../../store/reducers/meditationReducer'
import ProfileDataReducer from '../../store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from '../../store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from '../../store/reducers/AuthDataReducer'
import MoodReducer from '../../store/reducers/MoodReducer'
import logger from 'redux-logger'

import SearchUsersScreen from '../../screens/friendsAndMsgs/SearchUsersScreen'
//mock entire module 

import moxios from 'moxios'
import InitialState from '../../testStateManager/screenStates/searchUsersScreenInitialState'
import handleInitialState from '../../testStateManager/stateManager'

const InitialStateLoading = handleInitialState(InitialState, 'FriendsAndMsgs', [{ "fetchUsersLoading": true }])


let element;
let navigation;
let rootReducers;
let store;

describe('fetch all user data successfully', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/all_users', {
            status: 200, response: [
                {
                    "username": "test1",
                    "first_name": "",
                    "last_name": "",
                    "user_photo": "photo1"
                },
                {
                    "username": "test2",
                    "first_name": "",
                    "last_name": "",
                    "user_photo": "photo2"
                },
                {
                    "username": "test3",
                    "first_name": "",
                    "last_name": "",
                    "user_photo": "photo3"
                }]
        })
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, InitialState, applyMiddleware(ReduxThunk)) //logger
        element = render(<Provider store={store}>   <SearchUsersScreen navigation={navigation} /> </Provider>)
    })

    afterEach(() => {
        moxios.uninstall()
    })


    test('all users title exists', async () => {
        const { update, getByTestId, getByText } = element
        let titleElement = await waitForElement(() => getByTestId('AllUsersTitle'))
        expect(titleElement.props['children']).toBe('All Users')

    })

    test('User card shows friend and non friend user info', async () => {
        const { update, getByTestId, getByText } = element
        let userFriendCardUserName1 = await waitForElement(() => getByTestId('userCardUserFriendnametest1')) //test1 is the username of a friend
        let userFriendCardUserName2 = await waitForElement(() => getByTestId('userCardUserFriendnametest2')) //test2 is the username of a friend
        let userCardUserName = await waitForElement(() => getByTestId('userCardUsername'))//test3 is the username of a non friend user 

        expect(userFriendCardUserName1.props['children']).toBe('test1')
        expect(userFriendCardUserName2.props['children']).toBe('test2')
        expect(userCardUserName.props['children']).toBe('test3')

    }, 10000)

})


describe('fetch users loading', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/all_users', { status: 404, })
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, InitialStateLoading, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store}>   <SearchUsersScreen navigation={navigation} /> </Provider>)
    })

    afterEach(() => {
        moxios.uninstall()
    })
    test('Show users loading message', async () => {
        const { update, getByTestId, getByText } = element
        let loading = getByText('Loading').props['children']
        console.log(loading)
        expect(loading).toBe('Loading')
    })

})

describe('fetch error', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/all_users', { status: 404, })
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, InitialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store}>   <SearchUsersScreen navigation={navigation} /> </Provider>)
    })

    afterEach(() => {
        moxios.uninstall()
    })



    test('bad http request error handling raised', async () => {
        const { update, getByTestId, getByText } = element

        let errorText = await waitForElement(() => getByTestId('errorMSG').props['children'])
        expect(errorText).toBe('Could not Find user list data')
    })

})