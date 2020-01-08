import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import CreateMessage from '../store/actions/createMessage'
import FetchMessages from '../store/actions/FetchMessages'

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
    const [keyboardVisible, setKeyboardVisible] = useState(false)

    const dispatch = useDispatch()

    const handleChange = (text) => {
        setValue(text)
    }
    const removeKeyboard = () => {
        Keyboard.dismiss()
        setKeyboardVisible(false)
        console.log('kyboard f')

    }

    let messages = undefined;
    const token = useSelector((state) => state.meditations.token)
    const username = useSelector((state) => state.meditations.username)

    messages = useSelector((state) => state.meditations.singleMessages)

    const reciever_username = props.navigation.getParam('sendToUsername')

    const sendMessage = () => {
        // probably route the user to the msg inbox when done
        // send data to an action that will send an http request
        dispatch(CreateMessage(reciever_username, value, token))
        setValue('')
    }

    useEffect(() => {

        dispatch(FetchMessages(reciever_username, token))
    }, [dispatch])

    const msgData = () => {
        console.log(messages)
        // create a message here 
        const allMsgs = messages.map((message) => {
            //styles.myMessage
            //styles.friendMessage
            return (
                <View style={message.sender_username === username?styles.myMessage: styles.friendMessage}>
                    <Text style={message.sender_username === username? styles.myMessageText: styles.friendMessageText}>{message.msg}</Text>
                    <Text>{message.sender_username}</Text>
                </View>
            )
        })
        return (
            <View>
                {allMsgs}
              
            </View>

        )
    }

    const handleKeyboard = () => {
        console.log('kyboard t')
        setKeyboardVisible(true)
    }
    return (

        <View>
            <TouchableWithoutFeedback onPress={removeKeyboard}>
                <View styles={styles.screenContainer}>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>msg to {reciever_username}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <View style={keyboardVisible ? styles.msgContainerModified : styles.msgContainer}>
                            {messages ?
                                <View>
                                    <Text>Messages here </Text>
                                    {msgData()}
                                </View>

                                : null}
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleKeyboard}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <InputScrollView>
                                <TextInput
                                    onFocus={handleKeyboard}
                                    multiline={true}
                                    style={styles.TextInput}
                                    value={value} onChangeText={text => handleChange(text)} />
                            </InputScrollView>
                            <Button title='submit' onPress={sendMessage} />

                        </View>
                    </TouchableOpacity>

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
    myMessage:{
        marginLeft:20,
        marginBottom: 10,
        borderStyle:'solid',
        borderWidth:1,
        width: 100,
        backgroundColor:colors.base,
    },
    myMessageText:{
        color:'green',
    },
    friendMessage: {
        marginLeft:200,
        marginBottom: 10,
        borderStyle:'solid',
        borderWidth:1,
        width: 100,
        backgroundColor:colors.darkStrongPrimary,
    },
    friendMessageText:{
        color:'white',
    },
    msgContainer: {
        height: Dimensions.get('window').height * .5,
        width: Dimensions.get('window').width,
        borderColor: 'gray',
        borderWidth: 1,
    },
    msgContainerModified: {
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width,
        borderColor: 'gray',
        borderWidth: 1,
    },
    screenContainer: {

        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    TextInput: {
        height: Dimensions.get('window').height * .09,
        width: Dimensions.get('window').width * .75,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 18,
        paddingTop: Dimensions.get('window').height * .005

    },
    MoveTextInput: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width * .999,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingBottom: 0,
        fontSize: 18,
        paddingTop: Dimensions.get('window').height * .005,
        marginBottom: 400,
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