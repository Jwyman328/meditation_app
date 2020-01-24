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


/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function SearchUsersScreen() {
    const [friendsUsernames, setFriendsUsernames] = useState([]) //these names are here for test purposes ['test1', 'test2']
    const dispatch = useDispatch()
    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)
    const allUsers = useSelector((state) => state.FriendsAndMsgs.allUsers)
    const friends = useSelector((state) => state.FriendsAndMsgs.friendsList)
    // handle errors if no user data is found
    const fetchUsersLoading = useSelector((state) => state.FriendsAndMsgs.fetchUsersLoading)
    const fetchUsersError = useSelector((state) => state.FriendsAndMsgs.fetchUsersError)



    /**
     * Fetch all meditations and all favorited meditations for the user.
     * 
     * When the user logs all meditations will be request and loaded 
     * as well all previously existing favorited meditations will be reloaded into
     * their favorite meditations
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

    const addFriend = (username) => {
        dispatch(SendFriendRequest(username, token))
    }
    const removeFriend = (username) => {
        dispatch(AddRemoveFriend(username, token))
    }

    const createFriendCards = (user) => {
        return (
            // check if this user is the current user 
            user.item.username === username ?
                // if is the same as the current user do nothing
                //dont want yourself in a search for other users?
                null :
                // check if this user is a friend
                friendsUsernames.includes(user.item.username) ?

                    <View testID={'userCard'} style={styles.friendCard}>
                        <View>
                            <Text testID={`userCardUserFriendname${user.item.username}`}>{user.item.username}</Text>
                            <Image style={styles.cardImage} source={{ uri: user.item.user_photo }} />
                        </View>

                        <TouchableOpacity onPress={() => removeFriend(user.item.username)}>
                            <View>
                                <Ionicons name='ios-remove-circle-outline' size={75} color={'red'} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    :

                    <View testID={'userCard'} style={styles.friendCard}>
                        <View>
                            <Text testID={`userCardUsername`}>{user.item.username}</Text>
                            <Image style={styles.cardImage} source={{ uri: user.item.user_photo }} />
                        </View>

                        <TouchableOpacity onPress={() => addFriend(user.item.username)}>
                            <View>
                                <Ionicons name='md-person-add' size={75} color={'green'} />
                            </View>
                        </TouchableOpacity>

                    </View>
        )

    }

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
                        
                        {allUsers && friendsUsernames ? <FlatList testID={'userCard'} numColumns={1} data={allUsers} keyExtractor={(item => item.username)} renderItem={(user) => createFriendCards(user)} /> : null}
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