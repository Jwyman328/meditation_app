import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';


import FetchPendingFriendRequests from '../../store/actions/fetchPendingFriendRequests'
import AcceptDenyFriendRequest from '../../store/actions/acceptDenyFriendRequest'


import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons'

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function InboxScreen() {

    const dispatch = useDispatch()
    const pendingFriendRequests = useSelector((state) => state.meditations.pendingFriendRequests)
    const username = useSelector((state) => state.meditations.username)
    const token = useSelector((state) => state.meditations.token)

    useEffect(() => {
        dispatch(FetchPendingFriendRequests(token))
        
    }, [dispatch])

    const handleRequest = (id, bool) => {
        dispatch(AcceptDenyFriendRequest(id, bool,token))
        //dispatch(FetchPendingFriendRequests(token))
    }

    const createSenderCards = (friendRequest) => {
        console.log(friendRequest.item.sender_username, 'beep')
        return (
            <View style={styles.friendCard}>
                <View>
                    <Text> {friendRequest.item.sender_username}</Text>
                    <Image style={styles.cardImage} source={{ uri: friendRequest.item.sender_profile_picture }} />
                </View>
                <TouchableOpacity onPress={() => handleRequest(friendRequest.item.id,1)}>
                    <View>
                        <Ionicons name='ios-checkmark-circle-outline' size={45} color={'green'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRequest(friendRequest.item.id, 0)}>
                    <View style={{marginLeft:20}}>
                        <Ionicons name='ios-remove-circle-outline' size={45} color={'red'} />
                    </View>
                </TouchableOpacity>

            </View>
        )

    }

    return (
        <View styles={{ flex: 1, }} >
            <View style={styles.cardsContainer}>
                <Text>My Friend requests</Text>
                {pendingFriendRequests ? <FlatList numColumns={1} data={pendingFriendRequests} keyExtractor={(item => item.id )} renderItem={(friendRequest) => createSenderCards(friendRequest)} /> : null}

            </View>
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