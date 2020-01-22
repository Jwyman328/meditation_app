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

import InboxScreen from '../../screens/friendsAndMsgs/InboxScreen'
//mock entire module 

import moxios from 'moxios'



let element;
let navigation;
let rootReducers;
let store;
const initialState = {
  "AuthData": {
    "logInfetchError": false,
    "logInfetchLoading": false,
    "loggedIn": true,
    "password": "testword",
    "resetPasswordEmailSent": false,
    "resetPasswordFetchError": false,
    "resetPasswordLoading": false,
    "signUpFetchError": false,
    "signUpFetchLoading": false,
    "token": "mytoken",
    "username": "jwyman328",
  },
  "Fitness": {
    "currentStepCount": 1000,
    "dailyStepGoal": 3005,
    "fetchDailyStepsError": false,
    "fetchDailyStepsLoading": false,
  },
  "FriendsAndMsgs": {
    "allUsers": [],
    "pendingFriendRequests": [],
    "fetchFriendsError": false,
    "fetchFriendsLoading": false,
    "fetchPendingFriendRequestsError": false,
    "fetchPendingFriendRequestsLoading": false,
    "fetchSingleMessagesError": false,
    "fetchSingleMessagesLoading": false,
    "fetchUsersError": false,
    "fetchUsersLoading": false,
    "friendsList": [
      {
        "first_name": "test_second_first",
        "last_name": "test_second_last",
        "user_photo": 'photo1',
        "username": "test1",
      },
      {
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "user_photo": "photo2",
        "username": "test2",
      }

    ]

  }
}
// set fetchFriendError to true 
const initialStateError = {
  "AuthData": {
    "logInfetchError": false,
    "logInfetchLoading": false,
    "loggedIn": true,
    "password": "testword",
    "resetPasswordEmailSent": false,
    "resetPasswordFetchError": false,
    "resetPasswordLoading": false,
    "signUpFetchError": false,
    "signUpFetchLoading": false,
    "token": "mytoken",
    "username": "jwyman328",
  },
  "Fitness": {
    "currentStepCount": 1000,
    "dailyStepGoal": 3005,
    "fetchDailyStepsError": false,
    "fetchDailyStepsLoading": false,
  },
  "FriendsAndMsgs": {
    "allUsers": [],
    "fetchFriendsError": true,
    "fetchFriendsLoading": false,
    "pendingFriendRequests": [],
    "fetchPendingFriendRequestsError": true,
    "fetchPendingFriendRequestsLoading": false,
    "fetchSingleMessagesError": false,
    "fetchSingleMessagesLoading": false,
    "fetchUsersError": false,
    "fetchUsersLoading": false,
    "friendsList": [
      {
        "first_name": "test_second_first",
        "last_name": "test_second_last",
        "user_photo": 'photo1',
        "username": "test1",
      },
      {
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "user_photo": "photo2",
        "username": "test2",
      }

    ]

  }
}
const initialStateLoading = {
  "AuthData": {
    "logInfetchError": false,
    "logInfetchLoading": false,
    "loggedIn": true,
    "password": "testword",
    "resetPasswordEmailSent": false,
    "resetPasswordFetchError": false,
    "resetPasswordLoading": false,
    "signUpFetchError": false,
    "signUpFetchLoading": false,
    "token": "mytoken",
    "username": "jwyman328",
  },
  "Fitness": {
    "currentStepCount": 1000,
    "dailyStepGoal": 3005,
    "fetchDailyStepsError": false,
    "fetchDailyStepsLoading": false,
  },
  "FriendsAndMsgs": {
    "allUsers": [],
    "fetchFriendsError": false,
    "fetchFriendsLoading": true,
    "pendingFriendRequests": [{
        "id": 21,
        "sender_username": "jwyman",
        "sender_profile_picture": "photo1",
        "status": false,
        "sender": 3,
        "reciever": 1
    }],
    "fetchPendingFriendRequestsError": false,
    "fetchPendingFriendRequestsLoading": false,
    "fetchSingleMessagesError": false,
    "fetchSingleMessagesLoading": false,
    "fetchUsersError": false,
    "fetchUsersLoading": false,
    "friendsList": [
      {
        "first_name": "test_second_first",
        "last_name": "test_second_last",
        "user_photo": 'photo1',
        "username": "test1",
      },
      {
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "user_photo": "photo2",
        "username": "test2",
      }

    ]

  }
}
describe('fetch success', () => {
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
      Fitness: FitnessReducer,
      FriendsAndMsgs: FriendsAndMsgsReducer,
      AuthData: AuthDataReducer,
    })
    navigation = { navigate: jest.fn() };
    store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
    element = render(<Provider store={store}>   <InboxScreen navigation={navigation} /> </Provider>)
  })

  afterEach(() => {
    moxios.uninstall()
})


  test('search  friends title', async() => {
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

  describe('pendingFriendRequestsError', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/friends/pending_friend_requests/',{status:400, })        
          rootReducers = combineReducers({
          Fitness: FitnessReducer,
          FriendsAndMsgs: FriendsAndMsgsReducer,
          AuthData: AuthDataReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store}>   <InboxScreen navigation={navigation} /> </Provider>)
      })
    
      afterEach(() => {
        moxios.uninstall()
    })

    test('fail pending friend request fetch', async() => {
        const {getByTestId} = element;
        //const failureText = getByTestId('fetchFailure')
        const failureText = await waitForElement(() => getByTestId('fetchFailure')) 
        expect(failureText.props['children']).toBe('Could not get friend request')
    })
  })