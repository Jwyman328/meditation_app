import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import colors from '../../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';
import PropTypes from 'prop-types'

/**
 * Input area for writting a message.
 * 
 * Contains ability to send message to other user.
 */
function MessageInput(props) {
    const [value, setValue] = useState('')
    const handleChange = (text) => {
        setValue(text)
    }
    /**
     * Send text input as a message to other user.
     */
    const sendMessage = () => {
        props.sendMessage(value, props.token, props.reciever_username)
        setValue('')
    }

return(
    <TouchableOpacity onPress={props.handleKeyboard}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <InputScrollView>
                <TextInput
                    testID={'textinputArea'}
                    onFocus={props.handleKeyboard}
                    multiline={true}
                    style={styles.TextInput}
                    value={value} onChangeText={text => handleChange(text)} />
            </InputScrollView>
            <Button testID='sendMessageButton' title='submit' onPress={sendMessage} />
        </View>
    </TouchableOpacity>
)
}
export default MessageInput;
MessageInput.propTypes = {
    /**move messageInput based off of typing or not */
    handleKeyboard: PropTypes.func,
    /**function to take text input and send as message */
    sendMessage: PropTypes.func,
    /**jwt token for making http request */
    token: PropTypes.string,
    /** username of user recieving message */
    reciever_username : PropTypes.string,
}
const styles = StyleSheet.create({
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

})