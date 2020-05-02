import React from 'react';
import { render, fireEvent, waitForElement } from 'react-native-testing-library';
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


import MeditationCompletedScreen from '../../screens/MeditationScreens/meditationCompletedScreen'
import initialState from '../../testStateManager/screenStates/fullCourseScreenInitialState' 

let rootReducers;
let store;
let element;

describe('Fetch data success', () => {

    beforeEach(() => {
 
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })

        navigation = {
            navigate: jest.fn(), getParam: jest.fn((data) => {
                return {
                    "audio_uri": "'../audio/CapableChange.mp3'",
                    "author": "Richard Burr",
                    "course": 1,
                    "id": 1,
                    "image_source": "None",
                    "meditation_course_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                    "orderNumber": 1,
                    "time": 411,
                    "title": "Capable Shift",
                  }
                })
        };
        store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store} ><MeditationCompletedScreen navigation={navigation} /></Provider>)
    })

    test ('meditation general title displayed', async() => {
        const {getByTestId} = element;
        const titleElement = await waitForElement(() => getByTestId('generalTitle') ) 
        expect(titleElement.props['children']).toBe('Meditation Completed')
    })

    test ('meditation specific title displayed', async() => {
        const {getByTestId} = element;
        const specificTitleElement = await waitForElement(() => getByTestId('specificTitle') ) 
        expect(specificTitleElement.props['children']).toBe('Capable Shift')
    })

    test ('meditation author displayed', async() => {
        const {getByTestId} = element;
        const authorElement = await waitForElement(() => getByTestId('meditationAuthor') ) 
        expect(authorElement.props['children']).toEqual(["by ", "Richard Burr"])
    })
})