import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import CreateMessage from '../../store/actions/createMessage';
import FetchMessages from '../../store/actions/FetchMessages';

import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';
import Message from './components/message';
import MessageInput from './components/messageInput';
import AllMessagesContainer from './components/allMessagesContainer'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


/**
 * Screen displays conversation of messages between two users.
 */
function MessageConversationScreen(props) {

    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const dispatch = useDispatch()
    const handleChange = (text) => {
        setValue(text)
    }
    const removeKeyboard = () => {
        Keyboard.dismiss()
        setKeyboardVisible(false)
    }

    let messages = undefined;
    const token = useSelector((state) => state.AuthData.token)
    const username = useSelector((state) => state.AuthData.username)

    messages = useSelector((state) => state.FriendsAndMsgs.singleMessages)
    //Handle loading and error for fetching messages 
    const fetchMessagesLoading = useSelector((state) => state.FriendsAndMsgs.fetchSingleMessagesLoading)
    const fetchMessagesError = useSelector((state) => state.FriendsAndMsgs.fetchSingleMessagesError)
    const reciever_username = props.navigation.getParam('sendToUsername')

    /**
     * Post message to database.
     * 
     * @param {string} value message test to be sent
     * @param {string} token jwt token to post message.
     * @param {string} reciever_username username of the intended reciever of the message
     */
    const sendMessage = (value, token, reciever_username) => {
        // probably route the user to the msg inbox when done
        // send data to an action that will send an http request
        dispatch(CreateMessage(reciever_username, value, token))
    }
    /**
     * Fetch all messages between user and selected friend.
     */
    useEffect(() => {
        dispatch(FetchMessages(reciever_username, token))
    }, [dispatch])

    const handleKeyboard = () => {
        setKeyboardVisible(true)
    }
    return (
            <KeyboardAvoidingView keyboardVerticalOffset={Dimensions.get('window').height * .12} style={styles.screenContainer} behavior='position'>
            <View style={styles.anotherCont} onPress={removeKeyboard}>
                {fetchMessagesLoading ?
                    <Text testID={'loadingTitle'}>Messages Loading</Text>
                    :
                    fetchMessagesError ?
                        <Text testID={'errorTitle'}>Error Loading Messages</Text>
                        :
                       <View>
                        <AllMessagesContainer messages={messages} keyboardVisible={keyboardVisible}>
                                <MessageInput reciever_username={reciever_username} token={token} handleKeyboard={handleKeyboard} sendMessage={sendMessage} />
                        </AllMessagesContainer> 
                        </View>
                        }
            </View>
            </KeyboardAvoidingView>
    )
}

export default MessageConversationScreen;

MessageConversationScreen.navigationOptions = (navData) => {
    reciever_username = navData.navigation.getParam('sendToUsername')
    return {
        headerTitle: reciever_username
    }
}
const styles = StyleSheet.create({
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
        //borderWidth: 1,
    },
    screenContainer: {
        maxHeight: Dimensions.get('window').height * 1.6,
        minHeight: Dimensions.get('window').height *.8,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        //borderWidth:3,
        borderColor:'yellow'
    },
    anotherCont:{
        width: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height * 1.2,
        minHeight: Dimensions.get('window').height *.9,
        borderColor:'green',
        //borderWidth:2
    }

})