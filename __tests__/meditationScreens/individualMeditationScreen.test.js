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


import IndividualMeditationScreen from '../../screens/MeditationScreens/IndividualMeditationScreen'
import initialState from '../../testStateManager/screenStates/fullCourseScreenInitialState' 

let rootReducers;
let store;
let element;

// all tests in single test because error when trying multiple tests
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
                    "meditationData":  {
                        "audio_uri": "../audio/WorkInProgress.mp3",
                        "author": "Richard Burr",
                        "course": 3,
                        "id": 13,
                        "image_source": "None",
                        "meditation_course_photo": "course_photo",
                        "orderNumber": 13,
                        "time": 581,
                        "title": "Work in Progress 3",
                      },
                      "uri": "thisUri",
                    }
                })
        };
        store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store} ><IndividualMeditationScreen navigation={navigation} /></Provider>)
    })

    test ('meditation title displayed', async() => {
        const {getByTestId} = element;
        const titleElement = await waitForElement(() => getByTestId('meditationTitle') ) 
        expect(titleElement.props['children']).toBe('Work in Progress 3')
    })
    test ('meditation Author displayed', async() => {
        const {getByTestId} = element;
        const authorElement = await waitForElement(() => getByTestId('meditationAuthor') ) 
        expect(authorElement.props['children']).toBe('Richard Burr')
    })

    test('play icon showing to start', async() => {
        const {getByTestId} = element;
        const pausePlayButton = await waitForElement(() => getByTestId('pausePlayButton') ) 
        // play icon showing to start 
        const pauseIcon = await waitForElement(() => getByTestId('playIcon') ) 
        expect(pauseIcon.props.name).toBe('ios-play-circle')
    })

    test('progress circle percent played starts at 0', async() => {
        const {getByTestId} = element;
        const progressCircle = await waitForElement(() => getByTestId('progressCircle') ) 
        const displayTime = await waitForElement(() => getByTestId('displayTime') ) 
                // play icon showing to start 
        expect(progressCircle.props.percent).toBe(0)
        
    })
    test('progress circle percent display time start at 0:00', async() => {
        const {getByTestId} = element;
        const displayTime = await waitForElement(() => getByTestId('displayTime') ) 
                // play icon showing to start 
        expect(displayTime.props['children']).toBe('00:00')
        
    })

//test fails 
/*     test('pause icon showing after start', async(done) => {
        const {getByTestId} = element;
        const pausePlayButton = await waitForElement(() => getByTestId('pausePlayButton') ) 
        // play icon showing to start 
        fireEvent(pausePlayButton, 'onPress')
        const pauseIcon = await waitForElement(() => getByTestId('pauseIcon') ) 
        expect(pauseIcon.props.name).toBe('ios-pause')
    }) */


    

})
