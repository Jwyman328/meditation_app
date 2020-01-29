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

import JournalScreen from '../../screens/JournalAndEmotions/JournalScreen'
import initialState from '../../testStateManager/screenStates/fullCourseScreenInitialState' 

let rootReducers;
let store;
let element;

describe('JournalScreen', () => {
    beforeEach(() => {
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
        element = render(<Provider store={store} ><JournalScreen navigation={navigation} /></Provider>)
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
        expect(titleElement.props['children']).toBe("How are you feeling?")
    })

    test ('Emotion title starts neutral', async() => {
        const {getByTestId} = element;

        const emotionTitleElement = await waitForElement(() => getByTestId('emotionTitle') ) 
        expect(emotionTitleElement.props['children']).toBe("Neutral")
    })

    
    test ('Icon starts as neutral face value', async() => {
        const {getByTestId} = element;

        const faceIconElement = await waitForElement(() => getByTestId('faceIcon') ) 
        expect(faceIconElement.props.name).toBe("emoticon-neutral")
    })

    test ('Emotion slider starts at neutral', async() => {
        const {getByTestId} = element;

        const emotionSliderElement = await waitForElement(() => getByTestId('emotionSlider') ) 
        expect(emotionSliderElement.props.value).toBe(3)
    })

    test('Start journal button navigates to writeJournalScreen', async() =>{
        const {getByTestId} = element;

        const navigateButton = await waitForElement(() => getByTestId('navigateButton') ) 
        fireEvent(navigateButton, 'onPress')
        const navigateTest = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("WriteJournalScreen", {"face": "emoticon-neutral", "faceEmotion": "Neutral", "happynessValue": 3}) )
    })

    describe('Change emotion slider value', () => {
        beforeEach(() => {
            const {getByTestId} = element;

            const emotionSliderElement = getByTestId('emotionSlider')
            fireEvent(emotionSliderElement, 'onValueChange', 5)
        })

        test('slider value changed', () => {
            const {getByTestId} = element;
            const emotionSliderElement = getByTestId('emotionSlider')
            expect(emotionSliderElement.props.value).toBe(5)
        })

        test('Emotion title changed', async() => {
            const {getByTestId} = element;

            const emotionTitleElement = await waitForElement(() => getByTestId('emotionTitle') ) 
            expect(emotionTitleElement.props['children']).toBe("Excellent")
        })
        test ('Icon value changed', async() => {
            const {getByTestId} = element;
    
            const faceIconElement = await waitForElement(() => getByTestId('faceIcon') ) 
            expect(faceIconElement.props.name).toBe("emoticon-excited")
        })
    })
    
})
