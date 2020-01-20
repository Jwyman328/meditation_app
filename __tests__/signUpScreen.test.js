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


import SignupScreen from '../screens/Auth/signUpScreen'

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
test(' email username', () => {
    const {getByPlaceholder} = render(<Provider store={store} ><SignupScreen /></Provider>)
    const emailUsername = getByPlaceholder('email')
    fireEvent(emailUsername,'onChangeText', 'newEmail@test.com')
    expect(emailUsername.props.value).toEqual('newEmail@test.com')
})


test('password ', () => {
    const {getByPlaceholder} = render(<Provider store={store} ><SignupScreen /></Provider>)
    const passwordTextInput = getByPlaceholder('password')

    fireEvent(passwordTextInput, 'onChangeText', 'newPassword')
    expect(passwordTextInput.props.value).toEqual('newPassword')
})


test('repeat password ', () => {
    const {getByPlaceholder} = render(<Provider store={store} ><SignupScreen /></Provider>)
    const passwordTextInput = getByPlaceholder('repeat password')

    fireEvent(passwordTextInput, 'onChangeText', 'repeatPassword')
    expect(passwordTextInput.props.value).toEqual('repeatPassword')
})


test(' first name', () =>{
    const {getByPlaceholder} = render(<Provider store={store} ><SignupScreen /></Provider>)
    const FirstNameInput = getByPlaceholder('First Name')
    fireEvent(FirstNameInput, 'onChangeText','myFirstName' )
    expect(FirstNameInput.props.value).toEqual('myFirstName')
})

test(' last name', () => {
    const {getByPlaceholder} = render(<Provider store={store} ><SignupScreen /></Provider>)
    const lastNameTextInput = getByPlaceholder('Last Name')

    fireEvent(lastNameTextInput, 'onChangeText', 'myLastName')
    expect(lastNameTextInput.props.value).toEqual('myLastName')
})

test('sign Up user Button press resets values to empty string', () => {
    const {getByTestId,getByPlaceholder } = render(<Provider store={store} ><SignupScreen /></Provider>)
    const signUpButton = getByTestId('signUp')

    //add first Name
    const FirstNameInput = getByPlaceholder('First Name')
    fireEvent(FirstNameInput, 'onChangeText','myFirstName' )
    expect(FirstNameInput.props.value).toEqual('myFirstName')

    //add Last Name
    const lastNameTextInput = getByPlaceholder('Last Name')
    fireEvent(lastNameTextInput, 'onChangeText', 'myLastName')
    expect(lastNameTextInput.props.value).toEqual('myLastName')
    
    //add email username 
    const emailUsername = getByPlaceholder('email')
    fireEvent(emailUsername,'onChangeText', 'newEmail@test.com')
    expect(emailUsername.props.value).toEqual('newEmail@test.com')

    //password
    const passwordTextInput = getByPlaceholder('password')

    fireEvent(passwordTextInput, 'onChangeText', 'newPassword')
    expect(passwordTextInput.props.value).toEqual('newPassword')

    //repeat password 
    const repeatpasswordTextInput = getByPlaceholder('repeat password')
    fireEvent(repeatpasswordTextInput, 'onChangeText', 'repeatPassword')
    expect(repeatpasswordTextInput.props.value).toEqual('repeatPassword')
    
    // press signUp button
    fireEvent(signUpButton, 'onPress')

    //test all values return to ''
    expect(FirstNameInput.props.value).toEqual('')
    expect(lastNameTextInput.props.value).toEqual('')
    expect(emailUsername.props.value).toEqual('')
    expect(passwordTextInput.props.value).toEqual('')
    expect(repeatpasswordTextInput.props.value).toEqual('')
})

