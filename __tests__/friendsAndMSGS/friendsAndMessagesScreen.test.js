import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import ReduxThunk from 'redux-thunk'


import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from '../../store/reducers/FitnessReducer'
import MeditationReducer from '../../store/reducers/meditationReducer'
import ProfileDataReducer from '../../store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from '../../store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from '../../store/reducers/AuthDataReducer'
import MoodReducer from '../../store/reducers/MoodReducer'

import UserFriendsScreen from '../../screens/friendsAndMsgs/UserFriendsScreen'



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
    "fetchFriendsError": false,
    "fetchFriendsLoading": false,
    "pendingFriendRequests": [],
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
    rootReducers = combineReducers({
      Fitness: FitnessReducer,
      FriendsAndMsgs: FriendsAndMsgsReducer,
      AuthData: AuthDataReducer,
    })
    navigation = { navigate: jest.fn() };
    store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
    element = render(<Provider store={store}>   <UserFriendsScreen navigation={navigation} /> </Provider>)
  })


  test('search  friends title', () => {

    const { update, getByTestId, getByText } = render(<Provider store={store}>   <UserFriendsScreen /> </Provider>)
    const title = getByTestId('friendsTitle')
    //fireEvent(email, 'onChangeText','footballjoe328@gmail.com')
    expect(title.props['children']).toBe('My Friends')
  })

  test('search friend usernames', () => {
    const { getByTestId } = element
    const friendUserNameOne = getByTestId('friendUserNametest1').props['children']
    const friendUserNameTwo = getByTestId('friendUserNametest2').props['children']
    expect(friendUserNameOne).toBe('test1')
    expect(friendUserNameTwo).toBe('test2')

  })

  test('friend photo exists', () => {
    const { getByTestId } = element
    const friendPhotoOne = getByTestId('friendPhotophoto1').props.source.uri
    const friendPhotoTwo = getByTestId('friendPhotophoto2').props.source.uri
    expect(friendPhotoOne).toBe('photo1')
    expect(friendPhotoTwo).toBe('photo2')
  })

  test('sendFriend message button exists', () => {
    const { getByTestId, update } = element;
    const sendFriendMessageButton = getByTestId('sendFriendMessagetest1')
    fireEvent(sendFriendMessageButton, 'onPress')
    //console.log(sendFriendMessageButton)
    //console.log(navigation.navigate)
    expect(navigation.navigate).toHaveBeenCalledWith('CreateMessage', { sendToUsername: 'test1' })

  })


})

describe('initial state fetchFriendData true', () => {
  beforeEach(() => {
    rootReducers = combineReducers({
      Fitness: FitnessReducer,
      FriendsAndMsgs: FriendsAndMsgsReducer,
      AuthData: AuthDataReducer,
    })
    navigation = { navigate: jest.fn() };
    store = createStore(rootReducers, initialStateError, applyMiddleware(ReduxThunk))
    element = render(<Provider store={store}>   <UserFriendsScreen navigation={navigation} /> </Provider>)
  })
  test('friend data fetch error', () => {
    //check that error msg exists when fetchError = true
    const { getByTestId } = element
    const errorMSGElement = getByTestId('errorMSG')
    expect(errorMSGElement.props['children']).toBe('Could not load friends')
  })
})

describe('initial state fetchfriend data loading ', () => {
  beforeEach(() => {
    rootReducers = combineReducers({
      Fitness: FitnessReducer,
      FriendsAndMsgs: FriendsAndMsgsReducer,
      AuthData: AuthDataReducer,
    })
    navigation = { navigate: jest.fn() };
    store = createStore(rootReducers, initialStateLoading, applyMiddleware(ReduxThunk))
    element = render(<Provider store={store}>   <UserFriendsScreen navigation={navigation} /> </Provider>)
  })

  test('while loading loading message shown', () => {
    const { getByTestId } = element
    const loadingElement = getByTestId('loadingMSG')
    expect(loadingElement.props['children']).toBe('Friends loading')
  })
})


