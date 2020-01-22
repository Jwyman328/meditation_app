import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './Navigation/MainNavigation'


import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import FitnessReducer from './store/reducers/FitnessReducer'
import MeditationReducer from './store/reducers/meditationReducer'
import ProfileDataReducer from './store/reducers/ProfileDataReducer'
import FriendsAndMsgsReducer from './store/reducers/FriendsAndMsgsReducer'
import AuthDataReducer from './store/reducers/AuthDataReducer'
import MoodReducer from './store/reducers/MoodReducer'

import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'


export default function App() {
  const rootReducers = combineReducers({
    meditation: MeditationReducer,
    Fitness: FitnessReducer,
    ProfileData: ProfileDataReducer,
    FriendsAndMsgs: FriendsAndMsgsReducer,
    AuthData: AuthDataReducer,
    Mood: MoodReducer,
  })

  const store = createStore(rootReducers, applyMiddleware(ReduxThunk, logger))
  return (
    <Provider store={store}><BottomTabs style={{ flex: 1, width: '100%' }} /></Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
