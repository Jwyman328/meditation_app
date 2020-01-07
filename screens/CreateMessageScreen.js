import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import CreateMessage from '../store/actions/createMessage'


import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';


/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function CreateMessageScreen(props) {

    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const handleChange = (text) => {
        setValue(text)
    }
    const removeKeyboard = () => {
        Keyboard.dismiss()
    }

    const token = useSelector((state) => state.meditations.token)
    const reciever_username = props.navigation.getParam('sendToUsername')

    const sendMessage = () => {
        // probably route the user to the msg inbox when done
        // send data to an action that will send an http request
        dispatch(CreateMessage(reciever_username , value, token))
        setValue('')
    }
    return (
        <View>
            <TouchableWithoutFeedback onPress={removeKeyboard}>
                <View styles={styles.screenContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>msg to {reciever_username}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <InputScrollView>

                            <TextInput
                                multiline={true}
                                style={styles.TextInput}
                                value={value} onChangeText={text => handleChange(text)} />

                            
                            <Button title='submit' onPress={sendMessage} />
                        </InputScrollView>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default CreateMessageScreen;

CreateMessageScreen.navigationOptions = (navData) => {
    return {

    }
}
const styles = StyleSheet.create({
    screenContainer: {

        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    TextInput: {
        height: Dimensions.get('window').height * .3,
        width: Dimensions.get('window').width * .9,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: Dimensions.get('window').height * .05,

    },

    title: {
        marginTop: 20,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    },
    border: {
        //borderStyle: 'solid',
        //borderWidth: 2,
        //borderColor: 'black',
        alignItems: 'center',
        height: Dimensions.get('window').height * .7,
        width: Dimensions.get('window').width * .9,
        //marginLeft: Dimensions.get('window').width * .05,
    },
    button: {
        height: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width * .1,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
    }
})