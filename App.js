import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './Navigation/MainNavigation'



export default function App() {
  return (
    <BottomTabs />
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
