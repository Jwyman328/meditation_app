import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';


import FetchPendingFriendRequests from '../../store/actions/fetchPendingFriendRequests'
import AcceptDenyFriendRequest from '../../store/actions/acceptDenyFriendRequest'


import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons'

import AcceptDenyFriendRequestCard from './components/acceptDenyFriendRequestCard'
//custom hooks 
import useGetPendingFriendRequestsInboxState from '../../customHooks/friendsAndMsgsCustomHooks/useGetPendingFriendRequestsInboxState'

/**
 * Screen showing all pending friend requests.
 * 
 */
function PendingFriendRequestsInbox() {
    const {pendingFriendRequests, fetchPendingFriendRequestsLoading,fetchPendingFriendRequestsError,username,token  } = useGetPendingFriendRequestsInboxState();
    const dispatch = useDispatch()

    /**
     * After user accepts or rejects a friend request, post results to the database.
     * 
     * Then fetch the new list of pending friend requests.
     * 
     * @param {number} id user id of the sender of the friend request.
     * @param {boolean} bool true value if user accepts the friend request, false if rejected.
     */
    const handleRequest = (id, bool) => {
        dispatch(AcceptDenyFriendRequest(id, bool, token))
        dispatch(FetchPendingFriendRequests(token))
    }

    /**
     * Create a pending friend request card for a pending friendRequest.
     * @param {object} friendRequest friendRequest info containing user id and username of sender.
     */
    const createSenderCards = (friendRequest) => {
        return (
            <AcceptDenyFriendRequestCard handleRequest={(id, bool) => handleRequest(id, bool)} sender_profile_picture={friendRequest.item.sender_profile_picture}
                sender_username={friendRequest.item.sender_username} id={friendRequest.item.id} />
        )
    }

    return (
        <View testID='viewMain' styles={{ flex: 1, }} >
            <Text> </Text>
            {fetchPendingFriendRequestsLoading ?
                <Text testID='friendRequestLoadingMSG'>Friend Request Loading</Text>
                :
                fetchPendingFriendRequestsError ?
                    <Text testID={'fetchFailure'}>Could not get friend request</Text>
                    :
                    <View testID='viewSuccess' style={styles.cardsContainer}>
                        <Text testID={'friendRequestTitle'} style={styles.titleText}>My Friend requests</Text>
                        {pendingFriendRequests ? <FlatList numColumns={1} data={pendingFriendRequests} keyExtractor={(item => (item.id).toString())} renderItem={(friendRequest) => createSenderCards(friendRequest)} /> : null}

                    </View>}
        </View>
    )
}

export default PendingFriendRequestsInbox;

const styles = StyleSheet.create({
    cardImage: {
        width: Dimensions.get('window').width * .2,
        height: Dimensions.get('window').height * .1
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
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .65,
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: Dimensions.get('window').height * .01,
    },
    inboxContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .8,
        width: Dimensions.get('window').width * .65,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: Dimensions.get('window').height * .01,
    },
    titleText: {
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    }
})