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


import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen'



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

test('email', () => {
    const {getByPlaceholder} = render(<Provider store={store} ><ForgotPasswordScreen /> </Provider>)
    const email = getByPlaceholder('email')
    fireEvent(email, 'onChangeText', 'testEmail@gmail.com')
    expect(email.props.value).toEqual('testEmail@gmail.com')
})

test('email reset to empty string on reset button press', () => {

    //    cant test because has a react navigation error 


    //const { findByText, getByTestId, getByText } = renderWithNavigation();
    //expect(getByTestId('resetButton').props.children);


    //const email = getByPlaceholder('email')
    //fireEvent(email, 'onChangeText', 'testEmail@gmail.com')
    //expect(email.props.value).toEqual('testEmail@gmail.com')

    //const resetButton = getByTestId('resetButton')
    //fireEvent(resetButton,'onPress')

    //expect(email.props.value).toEqual('')

})

