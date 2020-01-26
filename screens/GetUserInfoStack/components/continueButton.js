import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors'
import ScrollPicker from 'react-native-wheel-scroll-picker';


function ContinueButton(props) {
    return(
        <TouchableOpacity onPress={props.goToScreen} >
                <View style={styles.buttonContainer}>
                    <View style={styles.text}>
                        <Text style={{ color: 'black', opacity: 1, fontSize: 25 }}> {props.textValue} </Text>
                    </View>
                </View>
            </TouchableOpacity>
    )
}

export default ContinueButton


const styles = StyleSheet.create({
    text: {
        opacity: 1,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: Dimensions.get('window').height * .05,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .1,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 0,
        backgroundColor: 'white',
        opacity: .3,
    },
})
