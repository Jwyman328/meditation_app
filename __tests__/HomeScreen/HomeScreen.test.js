import React from 'react';
import { render, fireEvent, waitForElement } from 'react-native-testing-library';
import ReduxThunk from 'redux-thunk'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from '../../store/reducers/FitnessReducer'
import MeditationReducer from '../../store/reducers/meditationReducer'
import ProfileDataReducer from '../../store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from '../../store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from '../../store/reducers/AuthDataReducer'
import MoodReducer from '../../store/reducers/MoodReducer'

import InitialState from '../../testStateManager/screenStates/HomeScreenInitialState'
import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import moxios from 'moxios'
import { allCoursesResponseData, favoritesData, FriendData, FeelingsData, MoodData, ProfileData, DailyStepData } from '../../testStateManager/moxiosResponseData' 

let element;
describe('Home screen', () => {
    beforeEach(() => {
        moxios.install()
        moxios.stubRequest('https://intense-gorge-29567.herokuapp.com/all_meditation_courses/', { status: 200, response: allCoursesResponseData })
        moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/course_meditations/favorited', { status: 200, response: favoritesData })
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/user_friends`, { status: 200, response: FriendData })
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/personal/GetMyFeelings/`, { status: 200, response: FeelingsData })
        moxios.stubRequest('http://intense-gorge-29567.herokuapp.com/fitness/dailyStepGoal/', { status: 200, response: DailyStepData })
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/Journal/last_week_moods/str`, { status: 200, response: MoodData })
        moxios.stubRequest(`http://intense-gorge-29567.herokuapp.com/get_profile_additional_data`, { status: 200, response: ProfileData })

        rootReducers = combineReducers({
            meditation: MeditationReducer,
            Fitness: FitnessReducer,
            ProfileData: ProfileDataReducer,
            FriendsAndMsgs: FriendsAndMsgsReducer,
            AuthData: AuthDataReducer,
            Mood: MoodReducer,
        })
        navigation = { navigate: jest.fn() };
        store = createStore(rootReducers, InitialState, applyMiddleware(ReduxThunk))
        element = render(<Provider store={store}>   <HomeScreen navigation={navigation} /></Provider>)
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('Title displays', async () => {
        const { getByTestId } = element

        const titleElement = await waitForElement(() => getByTestId('title'))
        expect(titleElement.props['children']).toBe("I'm feeling?")
    })

    test('Face icon default to smile', () => {
        const {getByTestId} = element;
        const iconElement = getByTestId('faceIcon')
        expect(iconElement.props.name).toBe('emoticon-happy')
    })

    test('face icon press navigates to feelings screen', async() => {
        const {getByTestId} = element;
        const touchableFaceIcon = getByTestId('iconFaceTouchable')
        fireEvent(touchableFaceIcon,'onPress')
        expect(navigation.navigate).toHaveBeenCalledWith("Feeling")

    })

    test('Pedometer circle contains daily step goal', () => {
        const {getByTestId} = element;
        const pedometerElement = getByTestId('pedometer')
        expect(pedometerElement.props.dailyStepGoal).toBe(3006)
    })

    test('Pedometer press navigates to fitness screen', ()=>{
        const {getByTestId} = element;
        const pedometerElement = getByTestId('pedometerTouchable')
        fireEvent(pedometerElement, 'onPress')
        expect(navigation.navigate).toHaveBeenCalledWith("Fitness")
    } )

    test('Daily meditation image shows on card', () => {
        const {getByTestId} = element;
        const dailyMeditationImage = getByTestId('dailyMeditationImage')
        expect(dailyMeditationImage.props.source.uri.substr(0, 5)).toBe("data:")
    })

    test('Daily meditation title shows on card', () => {
        const {getByTestId} = element;
        const dailyMeditationTitle = getByTestId('dailyMeditationTitle')
        expect(dailyMeditationTitle.props['children'].length).toBeGreaterThanOrEqual(1)
    })

    test('Meditation press navigates to another screen', async() => {
        const {getByTestId} = element;
        const dailyMeditationElement = getByTestId('navigateToDailyMeditation')
        // press daily meditation card 
        fireEvent(dailyMeditationElement, 'onPress')
        //expect(navigation.navigate).toHaveBeenCalledWith('CreateMessage', { sendToUsername: 'test1' })

        const navigationElement = await waitForElement(() => expect(navigation.navigate.mock.calls.length).toEqual(1))
    })
    

})