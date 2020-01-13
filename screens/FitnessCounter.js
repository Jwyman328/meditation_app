import React, {useState, useEffect} from 'react'

import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, Button, TextInput, Dimensions, ScrollView } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import currentStepCount from '../store/actions/setCurrentStepCount'

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import MainHeaderButton from '../components/HeaderButton';
import App2 from '../screens/App2'





function App() {
    let dailyStepGoal = useSelector((state) => state.meditations.dailyStepGoal)

    const [dailyGoalLocal,setdailyGoalLocal] = dailyStepGoal? useState(dailyStepGoal) : null


    return (
        <View style={{ flex: 1 }}>
            <View>
            {dailyStepGoal ? <App2 card={true} dailyStepGoal={dailyStepGoal} /> : null}
            </View>
        </View>
    )
}

export default App;

//Community
App.navigationOptions = (navData) => {
    //const [filterModal, setFilterModal] = useState(false)
    const navigateToMessaging = () => {
        navData.navigation.navigate('Community')
    }
    const navigateToSettings = () => {
        navData.navigation.navigate('Settings')
    }
   return (
       {
           headerRight: 
                <ScrollView style={{marginTop:Dimensions.get('window').height * .02}} horizontal={true}>
                <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
                    <Item title='filter' color={colors.darkStrongPrimary} iconName='ios-mail' onPress={ navigateToMessaging } />
                </HeaderButtons>      
                </ScrollView>,
            headerLeft:
            <ScrollView style={{marginTop:Dimensions.get('window').height * .02}} horizontal={true}>
            <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
                <Item title='filter' color={colors.darkStrongPrimary} iconName='ios-settings' onPress={ navigateToSettings } />
            </HeaderButtons>      
            </ScrollView>,
       }
   )
        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center"
    },

});