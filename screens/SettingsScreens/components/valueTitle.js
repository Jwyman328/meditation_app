import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Display text prominently as a title.
 * 
 */
function ValueTitle(props) {
    return (
        <View style={styles.titleContainer}>
            <Text testID={`Title${props.titleText}`} style={styles.TitleText}>{props.titleText}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    TitleText: {
        fontSize: 30,
        fontFamily: 'Helvetica-LightOblique',

    },
    titleContainer: {
        marginVertical: Dimensions.get('window').height * .03,
    },
})

export default ValueTitle;
