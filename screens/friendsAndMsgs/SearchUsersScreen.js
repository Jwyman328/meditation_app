import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';

import FetchAllCourses from '../../store/actions/FetchAllCourses'
import FetchAllUsers from '../../store/actions/FetchAllUsers'
import AddRemoveFriend from '../../store/actions/addRemoveFriend'
import FetchUserFriends from '../../store/actions/FetchUserFriends'
import SendFriendRequest from '../../store/actions/sendFriendRequest'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';

import { Ionicons } from '@expo/vector-icons'

import UserFriendCard from '../friendsAndMsgs/components/userFriendCard'
import UserCard from '../friendsAndMsgs/components/userCard'
import { createUserCards } from './utils/friendRequestHelpers'
/**
 * Show all users allowing to search through and send friend request, or remove friend.
 * 
 */
function SearchUsersScreen() {
    const [friendsUsernames, setFriendsUsernames] = useState([])
    const dispatch = useDispatch()
    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)
    const allUsers = useSelector((state) => state.FriendsAndMsgs.allUsers)
    const friends = useSelector((state) => state.FriendsAndMsgs.friendsList)
    // handle errors if no user data is found
    const fetchUsersLoading = useSelector((state) => state.FriendsAndMsgs.fetchUsersLoading)
    const fetchUsersError = useSelector((state) => state.FriendsAndMsgs.fetchUsersError)

    /**
     * Fetch all users. Once fetched create list of user display cards.
     */
    useEffect(() => {
        dispatch(FetchAllUsers(token))
        if (allUsers && friends) {
            // map the friends 
            const friendsUsernames = friends.map((friend) => friend.username)
            setFriendsUsernames(friendsUsernames)
        } else {
        }
    }, [friends, dispatch,]) //[dispatch]

    return (
        <View testID={'viewMain'} styles={styles.container}>
            {fetchUsersLoading ?
                <Text>Loading</Text>
                :
                fetchUsersError ?
                    <Text testID={'errorMSG'}>Could not Find user list data</Text>
                    :
                    <View testID={'successView'} style={styles.cardsContainer}>
                        <Text testID={'AllUsersTitle'}>All Users</Text>

                        {allUsers && friendsUsernames ? <FlatList testID={'userCard'} numColumns={1} data={allUsers} keyExtractor={(item => item.username)} renderItem={(user) => createUserCards(user, username, friendsUsernames, dispatch, token)} /> : null}
                    </View>
            }
        </View>
    )
}

export default SearchUsersScreen;

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
        justifyContent: 'space-between',
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