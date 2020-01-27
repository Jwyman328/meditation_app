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

import PendingFriendRequestsInbox from '../../screens/friendsAndMsgs/PendingFriendRequestsInbox'
import InitialState from '../../testStateManager/screenStates/inboxScreenInitialState'
import handleInitialState from '../../testStateManager/stateManager'

const InitialStateLoading = handleInitialState(InitialState,'FriendsAndMsgs', [{"fetchPendingFriendRequestsLoading": true}])
import moxios from 'moxios'

let element;
let navigation;
let rootReducers;
let store;

describe('fetch pending friend requests success', () => {
  beforeEach(() => {
    moxios.install()
    moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/friends/pending_friend_requests/',{status:200, response: [{
        "id": 21,
        "sender_username": "jwyman",
        "sender_profile_picture": "photo1",
        "status": false,
        "sender": 3,
        "reciever": 1
    }]})
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
    element = render(<Provider store={store}>   <PendingFriendRequestsInbox navigation={navigation} /> </Provider>)
  })

  afterEach(() => {
    moxios.uninstall()
})


  test('search friend requests title', async() => {
    const { update, getByTestId, getByText } = element
    const title = getByTestId('viewMain')
    //const waitt = waitForElement('viewSuccess')
    const friendRequestTitleElement = await waitForElement(() => getByTestId('friendRequestTitle') )
    expect(friendRequestTitleElement.props['children']).toBe('My Friend requests')

    })
    
    test('friend request card shows friend request username', async() => {
        const { update, getByTestId, getByText } = element
        //const waitt = waitForElement('viewSuccess')
        const friendRequestUserNameElement = await waitForElement(() => getByTestId('friendRequestUserName') )
        expect(friendRequestUserNameElement.props['children']).toBe('jwyman')
        
    })
    test('friend request card shows friend request user photo', async() => {
        const { getByTestId } = element
        const friendRequestUserNameElement = await waitForElement(() => getByTestId('friendRequestUserPhoto') )
        expect(friendRequestUserNameElement.props.source.uri).toBe('photo1')
    })

    //have not tested acepting or denying friend requests 
  })

  describe('Pending Friend Request loading', () => {
    beforeEach(() => {
        moxios.install()
       
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, InitialStateLoading, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store}>   <PendingFriendRequestsInbox navigation={navigation} /> </Provider>)
      })
    
      afterEach(() => {
        moxios.uninstall()
    })

    test('Show pending friend request loading message', async() => {
        const {getByTestId} = element;
        const loadingMessageText = await waitForElement(() => getByTestId('friendRequestLoadingMSG')) 
        expect(loadingMessageText.props['children']).toBe('Friend Request Loading')
    })
  })

  describe('Pending Friend Request Error', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/friends/pending_friend_requests/',{status:400, })        
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
        element = render(<Provider store={store}>   <PendingFriendRequestsInbox navigation={navigation} /> </Provider>)
      })
    
      afterEach(() => {
        moxios.uninstall()
    })

    test('Show pending friend request error message', async() => {
        const {getByTestId} = element;
        //const failureText = getByTestId('fetchFailure')
        const failureText = await waitForElement(() => getByTestId('fetchFailure')) 
        expect(failureText.props['children']).toBe('Could not get friend request')
    })
  })