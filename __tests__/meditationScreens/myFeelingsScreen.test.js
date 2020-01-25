import React from 'react';
import {render, fireEvent, waitForElement} from 'react-native-testing-library';
import NewMessageForm from '../../Hello';
import { Updates } from 'expo';
import ReduxThunk from 'redux-thunk'
import moxios from 'moxios'


import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from '../../store/reducers/FitnessReducer'
import MeditationReducer from '../../store/reducers/meditationReducer'
import ProfileDataReducer from '../../store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from '../../store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from '../../store/reducers/AuthDataReducer'
import MoodReducer from '../../store/reducers/MoodReducer'


import MyFeelingsScreen from '../../screens/MeditationScreens/MyFeelingsScreen'
import initialState from '../../testStateManager/screenStates/myFeelingsScreenInitialState'

let rootReducers;
let store;
let element;
let feelingTrue = '#DF5286'
let feelingEmpty = 'black'
// all feelings initial set to value of 1
describe('Unit test feelings label icon', () => {

    beforeEach(() => {
        moxios.install()
        //sign up mock response
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/personal/GetMyFeelings/`, { status: 200, response: { token: 'myToken' }, })
        rootReducers = combineReducers({
           meditation: MeditationReducer,
           Fitness: FitnessReducer,
           ProfileData: ProfileDataReducer,
           FriendsAndMsgs: FriendsAndMsgsReducer,
           AuthData: AuthDataReducer,
           Mood: MoodReducer,
         })
    
         navigation = { navigate: jest.fn(), getParam: jest.fn() };
          store = createStore(rootReducers,initialState, applyMiddleware(ReduxThunk))
          element = render(<Provider store={store} ><MyFeelingsScreen navigation={navigation} /></Provider>)
    })
    //FeelingsLabelIcon can change feelings
      test('Feelings Icon value of true feeling is showing correct color', () => {
            const {getByTestId} = element
            const depressionOne = getByTestId('depressed1')
            expect(depressionOne.props.color).toBe(feelingTrue)
      })

      test('Feelings Icon value of empty value showing correct color', () => {
        const {getByTestId} = element
        const depressionOne = getByTestId('depressed2')
        expect(depressionOne.props.color).toBe(feelingEmpty)
  })

  test('Feelings Icon value changes on click', async() => {
    const {getByTestId} = element
    const depressionTwo = getByTestId('depressed2')
    expect(depressionTwo.props.color).toBe(feelingEmpty)

    depressionThree = getByTestId('depressed3')
    fireEvent(depressionThree,'onPress')
    // now despressed two is pink
    expect(depressionTwo.props.color).toBe(feelingTrue)
    //const newDepressedValue = 
})

test('All feeling icons  up to feelings value are correct color', async() => {
    const {getByTestId} = element
    //current value is one
    const depressionTwo = getByTestId('depressed2')
    expect(depressionTwo.props.color).toBe(feelingEmpty)

    //click depressed feeling 5
    depressionFive = getByTestId('depressed5')
    fireEvent(depressionFive,'onPress')

    //get all depressed icons
    depressionOne = getByTestId('depressed1')
    depressionThree = getByTestId('depressed3')
    depressionFour = getByTestId('depressed4')

    //All depressed values are pink
    expect(depressionOne.props.color).toBe(feelingTrue)
    expect(depressionTwo.props.color).toBe(feelingTrue)
    expect(depressionThree.props.color).toBe(feelingTrue)
    expect(depressionFour.props.color).toBe(feelingTrue)
    expect(depressionFive.props.color).toBe(feelingTrue)
})
}
   
)

describe('successful post of new feelings', () => {
    beforeEach(() => {
        moxios.install()
        //sign up mock response
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/personal/GetMyFeelings/`, { status: 200, response: { token: 'myToken' }, })
        rootReducers = combineReducers({
           meditation: MeditationReducer,
           Fitness: FitnessReducer,
           ProfileData: ProfileDataReducer,
           FriendsAndMsgs: FriendsAndMsgsReducer,
           AuthData: AuthDataReducer,
           Mood: MoodReducer,
         })

         navigation = { navigate: jest.fn(), getParam: jest.fn() };
          store = createStore(rootReducers,initialState, applyMiddleware(ReduxThunk))
          element = render(<Provider store={store} ><MyFeelingsScreen navigation={navigation} /></Provider>)

   })

   afterEach(() => {
       moxios.uninstall()
   })

   test('submit navigates user to homepage', async() => {
       const {getByTestId} = element;
       const submitButton = getByTestId('submitButton')

       fireEvent(submitButton, 'onPress')
       const navigationToHomePage = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith('Home') )
   })
})

describe('Set feelings from signUp process', () => {

    beforeEach(() => {
      
        rootReducers = combineReducers({
           meditation: MeditationReducer,
           Fitness: FitnessReducer,
           ProfileData: ProfileDataReducer,
           FriendsAndMsgs: FriendsAndMsgsReducer,
           AuthData: AuthDataReducer,
           Mood: MoodReducer,
         })
    
         navigation = { navigate: jest.fn(), getParam: jest.fn(() => true) };
          store = createStore(rootReducers,initialState, applyMiddleware(ReduxThunk))
          element = render(<Provider store={store} ><MyFeelingsScreen navigation={navigation} /></Provider>)
    })
    test('Do later button shows', () => {
        const {getByTestId} = element;
        const doLaterButton = getByTestId('doLaterButton')
        
        expect(doLaterButton.props.title).toBe('Do later')
    })

    test('Do later button navigates to home screen', async() => {
        const {getByTestId} = element;
        const doLaterButton = getByTestId('doLaterButton')
        
        fireEvent(doLaterButton, 'onPress')
        const navigationToHomePage = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith('Tabs') )
    })
})