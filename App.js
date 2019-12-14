import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './Navigation/MainNavigation'


import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import MeditationsReducer from './store/reducers/MeditationsReducer'


export default function App() {
  const rootReducers = combineReducers({
    meditations: MeditationsReducer
  })

  const store = createStore(rootReducers)
  return (
   <Provider store={store}><BottomTabs style={{flex:1, width:'100%'}}/></Provider>
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
