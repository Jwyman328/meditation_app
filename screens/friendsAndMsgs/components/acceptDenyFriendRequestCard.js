import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types';

/**
 * Card showing Friend request, allowing user to accept or deny friend request.
 * 
 */
function AcceptDenyFriendRequestCard(props) {
    return (
        <View key={props.sender_username} style={styles.friendCard}>
            <View>
                <Text testID={'friendRequestUserName'}>{props.sender_username}</Text>
                <Image testID={'friendRequestUserPhoto'} style={styles.cardImage} source={{ uri: props.sender_profile_picture }} />
            </View>
            <TouchableOpacity onPress={() => props.handleRequest(props.id, 1)}>
                <View>
                    <Ionicons name='ios-checkmark-circle-outline' size={45} color={'green'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.handleRequest(props.id, 0)}>
                <View style={{ marginLeft: 20 }}>
                    <Ionicons name='ios-remove-circle-outline' size={45} color={'red'} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AcceptDenyFriendRequestCard;

AcceptDenyFriendRequestCard.propTypes = {
    /** Username of user that sent friend request */
    sender_username : PropTypes.string,
    /**Uri to profile picture of sender fo friend request */
    sender_profile_picture: PropTypes.string,
    /**user id of sender of friend request */
    id: PropTypes.number,
    /**Function handing the accepting or denying of friend request */
    handleRequest: PropTypes.func,

}
const styles = StyleSheet.create({
    cardImage: {
        width: Dimensions.get('window').width * .2,
        height: Dimensions.get('window').height * .1
    },
    friendCard: {
        flexDirection: 'row',
        //justifyContent:'space-around',
        //alignContent:'flex-end',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .65,
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: Dimensions.get('window').height * .01,
    },
})