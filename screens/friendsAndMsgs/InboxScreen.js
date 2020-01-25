import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';


import FetchPendingFriendRequests from '../../store/actions/fetchPendingFriendRequests'
import AcceptDenyFriendRequest from '../../store/actions/acceptDenyFriendRequest'


import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons'

import AcceptDenyFriendRequestCard from '../friendsAndMsgs/components/acceptDenyFriendRequestCard'

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function InboxScreen() {
    const dispatch = useDispatch()
    const pendingFriendRequests = useSelector((state) => state.FriendsAndMsgs.pendingFriendRequests)
    const fetchPendingFriendRequestsLoading = useSelector((state) => state.FriendsAndMsgs.fetchPendingFriendRequestsLoading)
    const fetchPendingFriendRequestsError = useSelector((state) => state.FriendsAndMsgs.fetchPendingFriendRequestsError)
    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)

    useEffect(() => {
        dispatch(FetchPendingFriendRequests(token))
    }, [dispatch])

    const handleRequest = (id, bool) => {
        dispatch(AcceptDenyFriendRequest(id, bool, token))
        dispatch(FetchPendingFriendRequests(token))
    }

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
                        <Text testID={'friendRequestTitle'}>My Friend requests</Text>
                        {pendingFriendRequests ? <FlatList numColumns={1} data={pendingFriendRequests} keyExtractor={(item => (item.id).toString())} renderItem={(friendRequest) => createSenderCards(friendRequest)} /> : null}

                    </View>}
        </View>
    )
}

export default InboxScreen;

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
})