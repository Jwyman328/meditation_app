import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import CreateMessage from '../../store/actions/createMessage';
import FetchMessages from '../../store/actions/FetchMessages';

import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';
import Message from '../friendsAndMsgs/components/message';
import MessageInput from '../friendsAndMsgs/components/messageInput';
import AllMessagesContainer from '../friendsAndMsgs/components/allMessagesContainer'

function CreateMessageScreen(props) {

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

    const sendMessage = (value, token, reciever_username) => {
        // probably route the user to the msg inbox when done
        // send data to an action that will send an http request
        dispatch(CreateMessage(reciever_username, value, token))
    }

    useEffect(() => {
        dispatch(FetchMessages(reciever_username, token))
    }, [dispatch])

    const handleKeyboard = () => {
        setKeyboardVisible(true)
    }
    return (
        <View>
            <TouchableWithoutFeedback onPress={removeKeyboard}>
                {fetchMessagesLoading ?
                    <Text testID={'loadingTitle'}>Messages Loading</Text>
                    :
                    fetchMessagesError ?
                        <Text testID={'errorTitle'}>Error Loading Messages</Text>
                        :
                        <AllMessagesContainer messages={messages} keyboardVisible={keyboardVisible}>
                            <MessageInput reciever_username={reciever_username} token={token} handleKeyboard={handleKeyboard} sendMessage={sendMessage} />
                        </AllMessagesContainer>}
            </TouchableWithoutFeedback>
        </View>
    )
}

export default CreateMessageScreen;

CreateMessageScreen.navigationOptions = (navData) => {
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
        borderWidth: 1,
    },
    screenContainer: {

        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },

})