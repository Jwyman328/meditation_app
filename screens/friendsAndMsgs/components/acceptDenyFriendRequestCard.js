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
                <Image testID={'friendRequestUserPhoto'} style={styles.cardImage} source={{ uri: props.sender_profile_picture }} />
            </View>
            <View>
                <Text  style={styles.cardText} testID={'friendRequestUserName'}>{props.sender_username}</Text>
            </View>
            <TouchableOpacity onPress={() => props.handleRequest(props.id, 1)}>
                <View style={styles.addRemoveIcon}>
                    <Ionicons name='ios-checkmark-circle-outline' size={45} color={'green'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.handleRequest(props.id, 0)}>
                <View style={styles.addRemoveIcon}>
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
        height: Dimensions.get('window').height * .1,
        //borderWidth:4,
        borderRadius:Dimensions.get('window').width * .2/2,
        overflow: 'hidden',
        marginHorizontal: 10,

    },
    cardsContainer: {
        marginTop: Dimensions.get('window').height * .1,
        height: Dimensions.get('window').height * .7,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    friendCard: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width * .85,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: Dimensions.get('window').height * .01,
        backgroundColor:colors.base,
    },
    cardText: {
        fontFamily:'Helvetica-LightOblique',
        fontSize:20,
    },
    addRemoveIcon: {
        marginRight: 10,
    }
})