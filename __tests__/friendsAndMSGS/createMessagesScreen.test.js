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

import MessageConversationScreen from '../../screens/friendsAndMsgs/MessageConversationScreen'
import handleInitialState from '../../testStateManager/stateManager'
import moxios from 'moxios'

let element;
let navigation;
let rootReducers;
let store;
//let InitialState;
import InitialState from '../../testStateManager/screenStates/inboxScreenInitialState'
const InitialStateMessagesError = handleInitialState(InitialState,'FriendsAndMsgs', [{"fetchSingleMessagesError":true}])

//make initialState with error fetching friends data

describe('Fetch messages success', () => {
  beforeEach(() => {
    rootReducers = combineReducers({
      meditation: MeditationReducer,
      Fitness: FitnessReducer,
      ProfileData: ProfileDataReducer,
      FriendsAndMsgs: FriendsAndMsgsReducer,
      AuthData: AuthDataReducer,
      Mood: MoodReducer,
    })
    moxios.install()
    moxios.stubRequest( `http://intense-gorge-29567.herokuapp.com/friends/message_history/test_user_1/`,{status:200, response: [
      {
       "id": 1,
       "msg": "Hello my friend",
       "reciever_of_msg": 1,
       "reciever_username": "test_user_1",
       "sender_of_msg": 3,
       "sender_username": "test_user_2",
       "time_sent": "2020-01-07T16:03:21.796411Z",
     },
      {
       "id": 2,
       "msg": "Oh hi bud",
       "reciever_of_msg": 3,
       "reciever_username": "test_user_2",
       "sender_of_msg": 1,
       "sender_username": "test_user_1",
       "time_sent": "2020-01-07T16:03:27.611097Z",
     },
      {
       "id": 4,
       "msg": "This is a mag test ",
       "reciever_of_msg": 3,
       "reciever_username": "test_user_2",
       "sender_of_msg": 1,
       "sender_username": "test_user_1",
       "time_sent": "2020-01-07T19:56:33.914828Z",
     },
  
   ],})
   
    navigation = { navigate: jest.fn(),getParam:jest.fn().mockReturnValue('test_user_1') };
    store = createStore(rootReducers, InitialState , applyMiddleware(ReduxThunk)) //logger
    element = render(<Provider store={store}>   <MessageConversationScreen navigation={navigation} /> </Provider>)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('show Messages title ', async() => {
    const {getByTestId} = element;
    const MessageTitle = await waitForElement(() => getByTestId('MessagesTitle'))
    expect(MessageTitle.props['children']).toBe('Messages here')
  })

  test('textinput to send message exists', async() => {
    const {getByTestId} = element;
    const testInputElement = await waitForElement(() => getByTestId('textinputArea')) 
  })


  test('textinput to send message starts with empty string', async() => {
    const {getByTestId} = element;
    const testInputElement = await waitForElement(() => getByTestId('textinputArea')) 
    expect(testInputElement.props.value).toBe('')
  })

  test('textinput to send message can add text', async() => {
    const {getByTestId} = element;
    const testInputElement = await waitForElement(() => getByTestId('textinputArea')) 
    fireEvent(testInputElement,'onChangeText','new message test')
    expect(testInputElement.props.value).toBe('new message test')
  })

  test('send message button resets textinput value to empty string ', async()=>{
    const {getByTestId} = element;
    const testInputElement = await waitForElement(() => getByTestId('textinputArea')) 
    // add text input
    fireEvent(testInputElement,'onChangeText','new message test')
    expect(testInputElement.props.value).toBe('new message test')
  
    //send message 
    const sendMessageButton = await waitForElement(() => getByTestId('sendMessageButton'))
    fireEvent(sendMessageButton,'onPress')
    //check new value is empty string
    expect(testInputElement.props.value).toBe('')
  })

  test('Messages exist with correct message text', async() => {
    const {getByTestId} = element;
    const firstMessageMessage = await waitForElement(() => getByTestId('MSG1'))
    //msg text is correct
    expect(firstMessageMessage.props['children']).toBe('Hello my friend')
  })


  test('Messages exist with correct message username of sender', async() => {
    const {getByTestId} = element;
    const firstMessageUserName = await waitForElement(() => getByTestId('MSGUsername1'))
    //messgee sender username is correct
    expect(firstMessageUserName.props['children']).toBe('test_user_2')
  })

  test('Message response from current user exists', async() => {
    const {getByTestId} = element;
    const secondMessageMessage = await waitForElement(() => getByTestId('MSG2'))
    const secondMessageUsername = await waitForElement(() => getByTestId('MSGUsername2'))
    //messgee sender username is correct
    expect(secondMessageMessage.props['children']).toBe('Oh hi bud')
    expect(secondMessageUsername.props['children']).toBe('test_user_1')
  })
})

describe('Fetch messages error', () => {
  beforeEach(() => {
    rootReducers = combineReducers({
      meditation: MeditationReducer,
      Fitness: FitnessReducer,
      ProfileData: ProfileDataReducer,
      FriendsAndMsgs: FriendsAndMsgsReducer,
      AuthData: AuthDataReducer,
      Mood: MoodReducer,
    })
    moxios.install()
    moxios.stubRequest( `http://intense-gorge-29567.herokuapp.com/friends/message_history/test_user_1/`,{status:404, response: [{}],})   
    navigation = { navigate: jest.fn(),getParam:jest.fn().mockReturnValue('test_user_1') };
    store = createStore(rootReducers, InitialState , applyMiddleware(ReduxThunk)) //logger InitialStateMessagesError
    element = render(<Provider store={store}>   <MessageConversationScreen navigation={navigation} /> </Provider>)
  })

  test('test message error text displays', async() => {
    const {getByTestId} = element;
    const errorElement = await waitForElement(() => getByTestId('errorTitle'))
    expect(errorElement.props['children']).toBe('Error Loading Messages')
  })

})