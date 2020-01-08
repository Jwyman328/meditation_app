import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';

import FetchAllCourses from '../store/actions/FetchAllCourses'
import FetchAllUsers from '../store/actions/FetchAllUsers'
import AddRemoveFriend from '../store/actions/addRemoveFriend'
import FetchUserFriends from '../store/actions/FetchUserFriends'
import SendFriendRequest from '../store/actions/sendFriendRequest'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons'


/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function SearchUsersScreen() {
    const [friendsUsernames, setFriendsUsernames] = useState(undefined)
    const dispatch = useDispatch()
    const username = useSelector((state) => state.meditations.username)
    const token = useSelector((state) => state.meditations.token)
    const allUsers = useSelector((state) => state.meditations.allUsers)
    const friends = useSelector((state) => state.meditations.friendsList)


    /**
     * Fetch all meditations and all favorited meditations for the user.
     * 
     * When the user logs all meditations will be request and loaded 
     * as well all previously existing favorited meditations will be reloaded into
     * their favorite meditations
     */
    useEffect(() => {
        dispatch(FetchAllUsers(token))
        if (allUsers && friends){

            // map the friends 
            const friendsUsernames = friends.map((friend) => friend.username)
            setFriendsUsernames(friendsUsernames)

        }else{

        }


        
    }, [friends]) //[dispatch]

    const addFriend = (username) => {
        dispatch(SendFriendRequest(username,token))
    }
    const removeFriend = (username) => {
        dispatch(AddRemoveFriend(username,token))
    }

    const createFriendCards = (user) => {
        return (
            // check if this user is the current user 
            user.item.username === username?
                // if is the same as the current user do nothing
                //dont want yourself in a search for other users?
             null:
            // check if this user is a friend
            friendsUsernames.includes(user.item.username)?
            <View style={styles.friendCard}>
                <View>
                    <Text> {user.item.username}</Text>
                    <Image style={{ width: 80, height: 80 }} source={{ uri: user.item.user_photo }} />
                </View>
        
                <TouchableOpacity onPress={() => removeFriend(user.item.username)}>
                    <View>
                        <Ionicons name='ios-remove-circle-outline' size={75} color={'red'} />
                    </View>
                </TouchableOpacity>

            </View>
            :

            <View style={styles.friendCard}>
                <View>
                    <Text> {user.item.username}</Text>
                    <Image style={{ width: 80, height: 80 }} source={{ uri: user.item.user_photo }} />
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
        <View styles={styles.container}>
            <View style={styles.cardsContainer}>
                <Text>All Users</Text>
                {allUsers ? <FlatList numColumns={1} data={allUsers} keyExtractor={(item => item.username)} renderItem={(user) => createFriendCards(user)} /> : null}

            </View>
        </View>
    )
}

export default SearchUsersScreen;

const styles = StyleSheet.create({
    cardsContainer: {
        marginTop: Dimensions.get('window').height * .1,
        height: Dimensions.get('window').height * .7,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    friendCard: {
        flexDirection:'row',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .65,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 10,
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
        height: 500,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: 'green'
    },
    title: {
        marginTop: 20,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    }
})