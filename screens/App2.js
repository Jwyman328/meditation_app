import React, { useState, useEffect } from 'react'

import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, Button, TextInput, Dimensions, ScrollView } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MainHeaderButton from '../components/HeaderButton';
import currentStepCount from '../store/actions/setCurrentStepCount'


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
            <View style={{ flex: .5 }}>

                <ProgressCircle
                    percent={(totalDailySteps / this.props.dailyStepGoal) * 100}
                    radius={90}
                    borderWidth={8}
                    color={'#748AD6'}
                    shadowColor={colors.base}
                    bgColor={colors.primary}
                >
                    <Ionicons size={50} name='ios-walk' title='play' />

                    <Text style={styles.stepTextLarge}>
                        {totalDailySteps}
                    </Text>
                </ProgressCircle>
                <View >

                    <ProgressCircle
                        percent={(totalDailySteps / this.props.dailyStepGoal) * 100}
                        radius={30}
                        borderWidth={8}
                        color={'#748AD6'}
                        shadowColor={colors.base}
                        bgColor={colors.primary}
                    >
                        <Ionicons size={30} name='ios-pin' title='play' />

                    </ProgressCircle>
                    <Text>
                     {distance.toFixed(2)} miles
                    </Text>
                </View>

                
            </View>
        )
    }

    showFitnessCardMini = () => {
        const totalDailySteps = (this.state.pastStepCount + this.state.currentStepCount)
        const distance = totalDailySteps / 2200
        //style={styles.minicard}
        return (
            <View style={styles.minicard}>
                <ProgressCircle
                    percent={(totalDailySteps / this.props.dailyStepGoal) * 100}
                    radius={60}
                    borderWidth={6}
                    color={'#748AD6'}
                    shadowColor={colors.base}
                    bgColor={colors.primary}
                    opacity={.5}
                >
                    <Ionicons size={49} name='ios-walk' title='play' />

                    <Text style={styles.stepText}>
                        {totalDailySteps}
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
                {this.props.card ? this.showFitnessCard() : this.showFitnessCardMini()}
            </View>
        );
    }
}

export default App2;


const styles = StyleSheet.create({
    stepTextLarge: {
        fontSize: 39,
    },
    stepText: {
        fontSize: 29,
    },
    minicard: {
        //justifyContent:'center',
        //alignItems: 'center',
        //width:Dimensions.get('window').width * .6,
        //height:Dimensions.get('window').height * .12,
        //borderStyle: 'solid',
        //borderWidth:2,
        //backgroundColor: 'white',
        //borderRadius: 600,
        opacity: .7

    },
    container: {
        //flex: 1,
        //marginTop: 15,
        alignItems: "center",
        justifyContent: "center"
    },

});