import React from 'react';
import { render, fireEvent, waitForElement } from 'react-native-testing-library';
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

import WriteJournalScreen from '../../screens/JournalAndEmotions/WriteJournalScreen'
import initialState from '../../testStateManager/screenStates/fullCourseScreenInitialState' 

let rootReducers;
let store;
let element;

describe('WriteJournalScreen', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/course_meditations/3/`, {
            status: 200, response:[null],
        })
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = {navigate: jest.fn()};
        store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store} ><WriteJournalScreen navigation={navigation} /></Provider>)
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test ('Date displays', async() => {
        const {getByTestId} = element;
        const today = new Date()
        const date = today.toLocaleDateString()

        const dateElement = await waitForElement(() => getByTestId('date') ) 
        expect(dateElement.props['children']).toBe(date)
    })

    test ('Title displays', async() => {
        const {getByTestId} = element;

        const titleElement = await waitForElement(() => getByTestId('title') ) 
        expect(titleElement.props['children']).toEqual(["I'm feeling ", "neutral"])
    })
    test ('Emotion Icon face displays correct emotion', async() => {
        const {getByTestId} = element;

        const faceIconElement = await waitForElement(() => getByTestId('emotionFace') ) 
        expect(faceIconElement.props.name).toEqual("emoticon-neutral")
    })

    test ('Text input starts with empty string', async() => {
        const {getByTestId} = element;

        const textInputElement = await waitForElement(() => getByTestId('textInput') ) 
        expect(textInputElement.props.value).toEqual("")
    })
    test ('Text input can recieve text value', async() => {
        const {getByTestId} = element;

        const textInputElement = await waitForElement(() => getByTestId('textInput') ) 
        fireEvent(textInputElement, 'onChangeText', 'testText')
        expect(textInputElement.props.value).toEqual("testText")
    })

    test ('Submit journal button navigates to feelings homescreen', async() => {
        const {getByTestId} = element;

        const submitButtonElement = await waitForElement(() => getByTestId('submitButton') ) 
        fireEvent(submitButtonElement, 'onPress')
        const navigateTest = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith('JournalProgressScreen') )
    })


    
})