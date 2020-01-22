import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import NewMessageForm from '../Hello';
import { Updates } from 'expo';
import { element } from 'prop-types';
import ReduxThunk from 'redux-thunk'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from '../store/reducers/FitnessReducer'
import MeditationReducer from '../store/reducers/meditationReducer'
import ProfileDataReducer from '../store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from '../store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from '../store/reducers/AuthDataReducer'
import MoodReducer from '../store/reducers/MoodReducer'


import LoginScreen from '../screens/Auth/LogInScreen'

let rootReducers;
let store;
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

})
test('login username', () => {

    const {update, getByPlaceholder}  = render(<Provider store={store}>   <LoginScreen /></Provider>)
    const email = getByPlaceholder('email')
    fireEvent(email, 'onChangeText','footballjoe328@gmail.com')
    //expect(email.props.value).toEqual('footballjoe328@gmail.com')
})

test('login password', () => {
    const {update, getByPlaceholder}  = render(<Provider store={store}>   <LoginScreen /></Provider>)
    const password = getByPlaceholder('password')
    fireEvent(password, 'onChangeText', 'newPassword' )
    //expect(password.props.value).toEqual('newPassword')
})

test('user gets logged in username password reset to empty string ', () => {
    const {update, getByTestId, getByPlaceholder}  = render(<Provider store={store}>   <LoginScreen /></Provider>)
    
    //add user name 
    let email = getByPlaceholder('email')
    fireEvent(email, 'onChangeText','footballjoe328@gmail.com')
    //expect(email.props.value).toEqual('footballjoe328@gmail.com')
    
    //add password
    let password = getByPlaceholder('password')
    fireEvent(password,'onChangeText', 'newPassword')
    expect(password.props.value).toEqual('newPassword')

    //click logIn button
    const loginScreenButton = getByTestId('loginUser')
    fireEvent(loginScreenButton, 'onPress')

    //test email gets reset to ''
    //expect(email.props.value).toEqual('')
    
    //test password reset to ''
    //expect(password.props.value).toEqual('')

//loginScreen
})