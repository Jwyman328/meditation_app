import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, ShadowPropTypesIOS } from 'react-native';

import colors from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

/**
 * Show row of emotion catagory label and icons.
 * 
 */
function FeelingsLabelIcons(props) {

    return (
        <View style={styles.feelingsRow}>
            <View style={styles.FeelingSize}>
                <Text style={styles.feelingsText}>{props.title}</Text>
            </View>

            <Ionicons size={35} onPress={() => props.handleChange(props.catagory, 1)} color={props.handleColor(1, props.catagory)} name='ios-star-outline' title='play' />
            <Ionicons size={35} onPress={() => props.handleChange(props.catagory, 2)} color={props.handleColor(2, props.catagory)} name='ios-star-outline' title='play' />
            <Ionicons size={35} onPress={() => props.handleChange(props.catagory, 3)} color={props.handleColor(3, props.catagory)} name='ios-star-outline' title='play' />
            <Ionicons size={35} onPress={() => props.handleChange(props.catagory, 4)} color={props.handleColor(4, props.catagory)} name='ios-star-outline' title='play' />
            <Ionicons size={35} onPress={() => props.handleChange(props.catagory, 5)} color={props.handleColor(5, props.catagory)} name='ios-star-outline' title='play' />
        </View>
    )
}

export default FeelingsLabelIcons;

FeelingsLabelIcons.propTypes = {
    /**Emotion catagory */
    catagory: PropTypes.string,
    /**Handle change of emotional state*/
    handleChange: PropTypes.func,
    /**handle change of color of icons based on selected degree of emotional state */
    handleColor: PropTypes.func,
    /**text title */
    title: PropTypes.string,
}
const styles = StyleSheet.create({
    IconContainer: {
        marginRight: Dimensions.get('window').height * .01
    },
    FeelingSize: {
        width: Dimensions.get('window').width * .2,//80,
        paddingTop: Dimensions.get('window').height * .01
    },
    feelingsText: {
        fontSize: 15,
        fontFamily: 'Helvetica-Oblique',
    },
    feelingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: Dimensions.get('window').height * .016,//10,
        paddingLeft: Dimensions.get('window').height * .016,
    },


})