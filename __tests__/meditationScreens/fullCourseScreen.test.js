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


import FullCourseScreen from '../../screens/MeditationScreens/FullCourseScreen'
import initialState from '../../testStateManager/screenStates/fullCourseScreenInitialState'

let rootReducers;
let store;
let element;

// all tests in single test because error when trying multiple tests
describe('Fetch data success', () => {

    beforeEach(() => {
        moxios.install()
        //sign up mock response
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/course_meditations/3/`, {
            status: 200, response:
                [
                    {
                        "course_id": 5,
                        "meditation_course_photo": "meditationPhoto",
                        "orderNumber": 5,
                        "title": "Anxiety Free",
                        "time": 752,
                        "author": "Richard Burr",
                        "image_source": "none",
                        "audio_uri": "../audio/AnxietyFree.mp3",
                        "course": 1
                    },
                    {
                        "id": 4,
                        "meditation_course_photo": "meditationPhoto",
                        "orderNumber": 4,
                        "title": "Positive Self",
                        "time": 877,
                        "author": "Richard Burr",
                        "image_source": "None",
                        "audio_uri": "../audio/PositiveSelf.mp3",
                        "course": 1
                    },
                    {
                        "id": 3,
                        "meditation_course_photo": "meditationPhoto",
                        "orderNumber": 3,
                        "title": "Work in Progress",
                        "time": 581,
                        "author": "Richard Burr",
                        "image_source": "none",
                        "audio_uri": "../audio/WorkInProgress.mp3",
                        "course": 1
                    },
                    {
                        "id": 2,
                        "meditation_course_photo": "meditationPhoto",
                        "orderNumber": 6,
                        "title": "Restful Sleep",
                        "time": 831,
                        "author": "Richard Burr",
                        "image_source": "none",
                        "audio_uri": "../audio/restfulSleep.mp3",
                        "course": 1
                    },
                    {
                        "id": 1,
                        "meditation_course_photo": "meditationPhoto",
                        "orderNumber": 1,
                        "title": "Capable Shift",
                        "time": 411,
                        "author": "Richard Burr",
                        "image_source": "None",
                        "audio_uri": "'../audio/CapableChange.mp3'",
                        "course": 1
                    }
                ],
        })
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })

        navigation = {
            navigate: jest.fn(), getParam:
                jest.fn((input) => {
                    if (input === 'courseData') {
                        return {
                            "courseId": 3,
                            "image_uri": "photoURI",
                            "title": "Third one",
                        }
                    } else {
                        return null
                    }
                }), setParams: jest.fn()
        };
        store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store} ><FullCourseScreen navigation={navigation} /></Provider>)
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('test meditation course data displays for multiple individual meditation', async () => {
        const { getByTestId } = element;
        //title displays
        const titleCapableShift = await waitForElement(() => getByTestId('titleCapable Shift').props)
        const titleAxietyFree = await waitForElement(() => getByTestId('titleAnxiety Free').props)


        expect(titleCapableShift['children']).toBe('Capable Shift')
        expect(titleAxietyFree['children']).toBe('Anxiety Free')

        //time displays
        const timeCapableShift = await waitForElement(() => getByTestId('timeCapable Shift').props)
        const timeAxietyFree = await waitForElement(() => getByTestId('timeAnxiety Free').props)

        expect(timeCapableShift['children']).toBe('6:51')
        expect(timeAxietyFree['children']).toBe('12:32')

        //test order number displays
        const orderNumberElement = await waitForElement(() => getByTestId('orderNumber1').props)
        expect(orderNumberElement['children']).toBe(1)

        //onPress card navigates to individual meditation
        const touchableCard = await waitForElement(() => getByTestId('individualMeditationTouchableCapable Shift'))
        fireEvent(touchableCard, 'onPress')
        expect(navigation.navigate).toHaveBeenCalledWith('IndividualMeditationScreen', {
            data: {
                "meditationData": {
                    "audio_uri": "'../audio/CapableChange.mp3'",
                    "author": "Richard Burr",
                    "course": 1,
                    "id": 1,
                    "image_source": "None",
                    "meditation_course_photo": "meditationPhoto",
                    "orderNumber": 1,
                    "time": 411,
                    "title": "Capable Shift",
                },
                "uri": "photoURI",
            },
        })


    })




})