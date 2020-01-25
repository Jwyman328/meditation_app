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

import UserFriendsScreen from '../../screens/friendsAndMsgs/UserFriendsScreen' //'../../screens/friendsAndMsgs/UserFriendsScreen'
import handleInitialState from '../../testStateManager/stateManager'


let element;
let navigation;
let rootReducers;
let store;
//let InitialState;
import InitialState from '../../testStateManager/screenStates/searchFriendsState'

//make initialState with error fetching friends data
const errorState = handleInitialState(InitialState,'FriendsAndMsgs',[{"fetchFriendsError": true}])

//make initialState with loading fetching friends data
const loadingState = handleInitialState(InitialState,'FriendsAndMsgs',[{"fetchFriendsLoading": true}])


describe('Fetch Friends success', () => {
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
    store = createStore(rootReducers, InitialState , applyMiddleware(ReduxThunk, logger)) //
    element = render(<Provider store={store}>   <UserFriendsScreen navigation={navigation} /> </Provider>)
  })


  test('search friends title', async() => {

    const { update, getByTestId, getByText } = element //render(<Provider store={store}>   <UserFriendsScreen /> </Provider>)
    const title = await waitForElement(() => getByTestId('friendsTitle') )

    //fireEvent(email, 'onChangeText','footballjoe328@gmail.com')
    expect(title.props['children']).toBe('My Friends')
  })

  test('friend username card displays usernames of friends', () => {
    const { getByTestId } = element
    const friendUserNameOne = getByTestId('friendUserNametest1').props['children']
    const friendUserNameTwo = getByTestId('friendUserNametest2').props['children']
    expect(friendUserNameOne).toBe('test1')
    expect(friendUserNameTwo).toBe('test2')

  })

  test('friend username card displays photos of friends', () => {
    const { getByTestId } = element
    const friendPhotoOne = getByTestId('friendPhotophoto1').props.source.uri
    const friendPhotoTwo = getByTestId('friendPhotophoto2').props.source.uri
    expect(friendPhotoOne).toBe('photo1')
    expect(friendPhotoTwo).toBe('photo2')
  })

  test('friend username card sendFriend message button redirects to CreateMessage screen', () => {
    const { getByTestId, update } = element;
    const sendFriendMessageButton = getByTestId('sendFriendMessagetest1')
    fireEvent(sendFriendMessageButton, 'onPress')

    expect(navigation.navigate).toHaveBeenCalledWith('CreateMessage', { sendToUsername: 'test1' })

  })




})

 describe('Fetch friend data error', () => {
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
    store = createStore(rootReducers, errorState, applyMiddleware(ReduxThunk))
    element = render(<Provider store={store}>   <UserFriendsScreen navigation={navigation} /> </Provider>)
  })
  test('Show fetch friend data error message', () => {
    //check that error msg exists when fetchError = true
    const { getByTestId } = element
    const errorMSGElement = getByTestId('errorMSG')
    expect(errorMSGElement.props['children']).toBe('Could not load friends')
  })
})

describe('Fetch Friend data loading', () => {
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
    store = createStore(rootReducers, loadingState, applyMiddleware(ReduxThunk))
    element = render(<Provider store={store}>   <UserFriendsScreen navigation={navigation} /> </Provider>)
  })

  test('Show fetch friend data loading message', () => {
    const { getByTestId } = element
    const loadingElement = getByTestId('loadingMSG')
    expect(loadingElement.props['children']).toBe('Friends loading')
  })
})





