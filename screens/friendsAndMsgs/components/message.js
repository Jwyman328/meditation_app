import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Button, Dimensions } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../constants/colors';
import PropType from 'prop-types'

/**
 * 
 * Message between two users.
 */
function Message(props){
    return (
        <View style={props.sender_username === props.username ? styles.myMessage : styles.friendMessage}>
            <Text testID={`MSG${props.id}`} style={props.sender_username === props.username ? styles.myMessageText : styles.friendMessageText}>{props.message}</Text>
            <Text testID={`MSGUsername${props.id}`}>{props.sender_username}</Text>
        </View>
    )
}

export default Message;

Message.propType = {
    /**username of the sender of the message */
    sender_username: PropType.string,
    /**username of current user */
    username: PropType.string,
    /**text of message */
    message: PropType.string,
    /**Id of the message */
    id:PropType.number,

}
const styles = StyleSheet.create({
    myMessage: {
        marginLeft: 20,
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        width: 100,
        backgroundColor: colors.base,
    },
    myMessageText: {
        color: 'green',
    },
    friendMessage: {
        marginLeft: 200,
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        width: 100,
        backgroundColor: colors.darkStrongPrimary,
    },
    friendMessageText: {
        color: 'white',
    },

    title: {
        marginTop: 20,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    },

})