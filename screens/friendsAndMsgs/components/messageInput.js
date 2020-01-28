import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import colors from '../../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';
import { Ionicons } from '@expo/vector-icons'                             

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
    {/* <TouchableOpacity onPress={props.handleKeyboard}>
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
    </TouchableOpacity> */}
return(
    <View>
    <View style={styles.inputContainer}>
        <View style={styles.inputScroll}>
       <TextInput
                    testID={'textinputArea'}
                    onFocus={props.handleKeyboard}
                    multiline={true}
                    editable
                   style={styles.TextInput}
                    //style={newStyle}
                    value={value} onChangeText={text => handleChange(text)}
                   />
        </View>
        <View style={styles.sendContainer}>
            <TouchableOpacity testID='sendMessageButton' title='submit' onPress={sendMessage}>
                <Ionicons size={35} name='ios-arrow-dropup-circle' color={'blue'} title='play' />
            </TouchableOpacity>
        </View>
    </View>
    </View>
        
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
        //height: Dimensions.get('window').height * .09,
        width: Dimensions.get('window').width * .86,
        borderColor: 'gray',
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 14,
        paddingTop: Dimensions.get('window').height * .005,
        //borderWidth: 1, 
        minHeight:Dimensions.get('window').height * .07, 
        maxHeight:Dimensions.get('window').height * .2,
        borderRadius:20,
        paddingLeft:10,
    },
    inputContainer : {
         flexDirection: 'row', 
         justifyContent: 'flex-start', 
         alignItems: 'flex-start', 
         minHeight: Dimensions.get('window').height * .05,
         maxHeight: Dimensions.get('window').height * .2,
         //flex:1,
         width:Dimensions.get('window').width * .98,
         borderColor: 'black',
         borderWidth:1,
         marginBottom:20,
         borderRadius:20,
    },
    inputScroll: {
        minHeight: Dimensions.get('window').height * .05,
         maxHeight: Dimensions.get('window').height * .3,
    },
    sendContainer:{
        //borderWidth:2,
        borderColor:"green",
        width: Dimensions.get('window').width * .1,
        minHeight: Dimensions.get('window').height * .05,
        maxHeight: Dimensions.get('window').height * .3,
        marginLeft:2,
        marginRight:5,
        justifyContent:'flex-start',
        alignItems:'center'
    }

})