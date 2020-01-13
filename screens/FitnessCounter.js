import React, {useState, useEffect} from 'react'

import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, Button, TextInput, Dimensions, ScrollView } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import MainHeaderButton from '../components/HeaderButton';




class App2 extends React.Component {
    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0,
        distance: 0
    };

    componentDidMount() {
        let start = new Date();
        start.setHours(0, 0, 0, 0);
        console.log(start)
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        //start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({ pastStepCount: result.steps });
            },
            error => {
                this.setState({
                    pastStepCount: "Could not get stepCount: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    showFitnessCard = () => {
        const totalDailySteps = (this.state.pastStepCount + this.state.currentStepCount)
        const distance = totalDailySteps / 2200
        return (
            <View style={{flex:1}}>

                <Text>
                    Distance: {distance} miles
                </Text>
                <ProgressCircle
                    percent={(totalDailySteps / this.props.dailyStepGoal) * 100}
                    radius={90}
                    borderWidth={8}
                    color={'#748AD6'}
                    shadowColor={colors.base}
                    bgColor={colors.primary}

                >
                    <Ionicons size={70} name='ios-walk' title='play' />

                    <Text>
                        Today's Steps: {totalDailySteps}
                    </Text>
                </ProgressCircle>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {/*Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}*/}
                </Text>


                {this.showFitnessCard()}


            </View>
        );
    }
}

function App() {
    let dailyStepGoal = useSelector((state) => state.meditations.dailyStepGoal)

    const [dailyGoalLocal,setdailyGoalLocal] = dailyStepGoal? useState(dailyStepGoal) : null

    return (
        <View style={{ flex: 1 }}>
          
            <Text>
                Hi
            </Text>
            <View>
            {dailyStepGoal ? <App2 dailyStepGoal={dailyStepGoal} /> : null}
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