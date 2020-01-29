import React, {useState, useEffect} from 'react'

import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, Button, TextInput, Dimensions, ScrollView } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import MainHeaderButton from '../../components/HeaderButton';


class PedometerCircle extends React.Component {
    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0,
        distance: 0
    };
    componentDidMount() {
        let start = new Date();
        start.setHours(0, 0, 0, 0);
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

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {/*Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}*/}
                </Text>
                
            </View>
        );
    }
}

export default PedometerCircle;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center"
    },

});