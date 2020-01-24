import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Button, Dimensions, ImageBackground } from 'react-native'
import colors from '../../../constants/colors'
import PropTypes from 'prop-types'

/**
 * 
 * Authentication input box
 */
function AuthInputBox(props) {
    return (
        <View style={{ ...styles.formPair }}>
            <TextInput style={{ ...styles.formObj, ...styles.inputBox }}
                onChangeText={text => props.setValue(text)} required errorMessage='enter a correct username/password'
                value={props.value} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} autoCapitalize="none" />
        </View>
    )
}

export default AuthInputBox;

AuthInputBox.propTypes = {
    /**Sets text value */
    setValue: PropTypes.func,
    /**text value entered by user */
    value: PropTypes.string,
    /**If the input should be blocked from view */
    secureTextEntry: PropTypes.bool,
    /**text showing in input box */
    placeholder: PropTypes.string,
    
}
const styles = StyleSheet.create({
    formPair: {
        width: '90%',
        flexDirection: 'row',
        //margin: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: Dimensions.get('window').height * .10,

    },

    formObj: {
        height: Dimensions.get('window').height * .09,

    },
    inputBox: {
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 1,
        flex: 1,
        fontSize: 18
    },

})