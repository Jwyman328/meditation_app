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

import FilterScreen from '../../screens/MeditationScreens/FiltersModal'
import initialState from '../../testStateManager/screenStates/CoursesScreenInitialState' // Filter modal state is no different 



let rootReducers;
let store;
let element;

describe('Test test filter screen', () => {

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
        element = render(<Provider store={store} ><FilterScreen navigation={navigation} /></Provider>)
    })
    test('Filter label shows', () => {
        const { getByTestId } = element
        const anxietyLabel = getByTestId('labelAnxiety')
        expect(anxietyLabel.props['children']).toBe('Anxiety')
    })
    test('Filter switch contains correct initial value', () => {
        const { getByTestId } = element
        const anxietySwitchValue = getByTestId('switchAnxiety')
        const depressionSwitchValue = getByTestId('switchDepression')
        const confidenceSwitchValue = getByTestId('switchConfidence')

        expect(anxietySwitchValue.props.value).toBe(false)
        expect(depressionSwitchValue.props.value).toBe(true)
        expect(confidenceSwitchValue.props.value).toBe(true)
    })

    test('Filter switch press will change value', () => {
        const { getByTestId } = element
        const anxietySwitchValue = getByTestId('switchAnxiety')
        expect(anxietySwitchValue.props.value).toBe(false)

        fireEvent(anxietySwitchValue, 'onValueChange')
        expect(anxietySwitchValue.props.value).toBe(true)

    })

})