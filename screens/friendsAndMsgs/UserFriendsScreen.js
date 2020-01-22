import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';

import FetchFavorites from '../../store/actions/fetchFavorites'

import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';

import { Ionicons } from '@expo/vector-icons'

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function UserFriendsScreen(props) {

    const dispatch = useDispatch()
    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)
    const friends = useSelector((state) => state.FriendsAndMsgs.friendsList)
    //handle user friends error 
    const fetchFriendsLoading = useSelector((state) => state.FriendsAndMsgs.fetchFriendsLoading)
    const fetchFriendsError = useSelector((state) => state.FriendsAndMsgs.fetchFriendsError)

    /**
     * Fetch all meditations and all favorited meditations for the user.
     * 
     * When the user logs all meditations will be request and loaded 
     * as well all previously existing favorited meditations will be reloaded into
     * their favorite meditations
     */
    useEffect(() => {

    }, [dispatch])

    const sendMsg = (username) => {
        props.navigation.navigate('CreateMessage', { sendToUsername: username })
    }

    const createFriendCards = (friend) => {
        return (
            <View key={friend.item.username} style={styles.friendCard}>
                <Text testID={`friendUserName${friend.item.username}`}>{friend.item.username}</Text>
                <Image testID={`friendPhoto${friend.item.user_photo}`} style={styles.cardImage} source={{ uri: friend.item.user_photo }} />
                <TouchableOpacity testID={`sendFriendMessage${friend.item.username}`} onPress={() => sendMsg(friend.item.username)}>
                    <View>
                        <Ionicons name='ios-mail' size={45} color={'red'} />
                    </View>
                </TouchableOpacity>

            </View>
        )

    }

    return (
        <View styles={styles.container}>
            {fetchFriendsLoading?
                <Text testID={'loadingMSG'}>Friends loading</Text>
                        :
                        fetchFriendsError?
                        <Text testID={'errorMSG'}>Could not load friends</Text>
                                :
                            <View style={styles.cardsContainer}>
                                 <Text testID={'friendsTitle'}>My Friends</Text>
                                         {friends ? <FlatList numColumns={1} data={friends} keyExtractor={(item => item.username)} renderItem={(friend) => createFriendCards(friend)} /> : null}
            </View>}
        </View>
    )
}

export default UserFriendsScreen;

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
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .1,
        backgroundColor: 'green'
    },
    title: {
        marginTop: Dimensions.get('window').height * .05,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    }
})