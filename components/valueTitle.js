import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';


function ValueTitle(props) {
    return (
        <View style={styles.titleContainer}>
            <Text testID={'profileTitle'} style={styles.TitleText}>{props.titleText}</Text>
        </View>
    )
}

ValueTitle.propTypes = {
    titleText: PropTypes.string,
};

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
