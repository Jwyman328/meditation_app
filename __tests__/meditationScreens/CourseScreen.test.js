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


import CoursesScreen from '../../screens/MeditationScreens/CoursesScreen'
import initialState from '../../testStateManager/screenStates/CoursesScreenInitialState'
import handleInitialState from '../../testStateManager/stateManager'

const initialStateLoading = handleInitialState(initialState,'meditation', [{'fetchCoursesLoading': true}] )
const initialStateError = handleInitialState(initialState,'meditation', [{'fetchCoursesError': true}] )


let rootReducers;
let store;
let element;

describe('Meditation Course fetch successful', () => {

    beforeEach(() => {
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, initialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store} ><CoursesScreen navigation={navigation} /></Provider>)
    })
    //FeelingsLabelIcon can change feelings
    test('Course image shows on course card', () => {
        const { getByTestId } = element
        const courseCard = getByTestId('courseImage1')
        expect(courseCard.props.source.uri).toBe('meditationPhoto')
    })

    test('All courses show on individual card with titles', () => {
        const { getByTestId } = element
        const courseCard1 = getByTestId('course1')
        const courseCard2 = getByTestId('course2')
        const courseCard3 = getByTestId('course3')
        const courseCard4 = getByTestId('course4')

        expect(courseCard1.props.title).toBe('First one')
        expect(courseCard2.props.title).toBe('second one')
        expect(courseCard3.props.title).toBe('Third one')
        expect(courseCard4.props.title).toBe('Fourth one')
    })

    test('click on card navigates to course screen', async() => {
        const {getByTestId} = element;
        const courseTouchElement = getByTestId('courseCardTouchable1') 
        fireEvent(courseTouchElement,'onPress')
        const navigationTo = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("FullCourse", {"courseData": {"courseId": 1, "image_uri": "meditationPhoto", "title": "First one"}}) )
    })

    test('Course 1 navigates with correct data', async() => {
        const {getByTestId} = element;
        const courseTouchElement1 = getByTestId('courseCardTouchable1') 

        fireEvent(courseTouchElement1,'onPress')
        const navigationToCourseOne = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("FullCourse", {"courseData": {"courseId": 1, "image_uri": "meditationPhoto", "title": "First one"}}) )
    })
    test('Course 2 navigates with correct data', async() => {
        const {getByTestId} = element;
        const courseTouchElement2 = getByTestId('courseCardTouchable2') 

        fireEvent(courseTouchElement2,'onPress')
        const navigationToCourseTwo = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("FullCourse", {"courseData": {"courseId": 2, "image_uri": "meditationPhoto", "title": "second one"}}) )
    })
    test('Course 3 navigates with correct data', async() => {
        const {getByTestId} = element;
        const courseTouchElement3 = getByTestId('courseCardTouchable3') 

        fireEvent(courseTouchElement3,'onPress')
        const navigationToCourseThree = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("FullCourse", {"courseData": {"courseId": 3, "image_uri": "meditationPhoto", "title": "Third one"}}) )
    })

    test('Course 4 navigates with correct data', async() => {
        const {getByTestId} = element;
        const courseTouchElement4 = getByTestId('courseCardTouchable4') 

        fireEvent(courseTouchElement4,'onPress')
        const navigationToCourseFour = await waitForElement(() => expect(navigation.navigate).toHaveBeenCalledWith("FullCourse", {"courseData": {"courseId": 4, "image_uri": "meditationPhoto", "title": "Fourth one"}}) )
    })

})

describe('Meditation Course fetch loading', () => {

    beforeEach(() => {
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, initialStateLoading, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store} ><CoursesScreen navigation={navigation} /></Provider>)
    })
    //FeelingsLabelIcon can change feelings
    test('Loading message shows', () => {
        const { getByTestId } = element
        const loadingElement = getByTestId('loadingMsg')
        expect(loadingElement.props['children']).toBe('Loading')
    })

})


describe('Meditation Course fetch error', () => {
    beforeEach(() => {
        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, initialStateError, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store} ><CoursesScreen navigation={navigation} /></Provider>)
    })
    //FeelingsLabelIcon can change feelings
    test('Error message shows', () => {
        const { getByTestId } = element
        const errorElement = getByTestId('errorMsg')
        expect(errorElement.props['children']).toBe('Error loading meditations')
    })

})