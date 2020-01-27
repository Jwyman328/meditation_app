import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import InputScrollView from 'react-native-input-scroll-view';
import Message from '../../friendsAndMsgs/components/message';
import PropTypes from 'prop-types'

/**
 * Container holding all messages between two users.
 * 
 */
function AllMessagesContainer(props) {
    const dispatch = useDispatch()
    let messages = props.messages;
    //messages = useSelector((state) => state.FriendsAndMsgs.singleMessages)
    const username = useSelector((state) => state.AuthData.username)

    /**
     * Format all message data into an array of displayable message components
     */
    const msgData = () => {
        const allMsgs = messages.map((message) => {
            return (<Message key={message.id} username={username} sender_username={message.sender_username} message={message.msg} id={message.id} />)
        })
        return (<View>{allMsgs}</View>)
    }

    return (
        <ScrollView>
            <View styles={styles.screenContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={props.keyboardVisible ? styles.msgContainerModified : styles.msgContainer}>
                        {messages ?
                            <ScrollView>
                                <Text testID="MessagesTitle">Messages here</Text>
                                {msgData()}
                            </ScrollView>
                            : null}
                    </View>
                </View>
                {props.children}               
            </View>
        </ScrollView>
    )
}

export default AllMessagesContainer;

AllMessagesContainer.propTypes={
    /** All messages between two users */
    messages: PropTypes.array,
    keyboardVisible: PropTypes.bool,
    /**Message Input container for creating messages */
    children: PropTypes.node,

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