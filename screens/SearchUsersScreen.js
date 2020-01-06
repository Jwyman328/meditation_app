import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';

import FetchAllCourses from '../store/actions/FetchAllCourses'
import FetchAllUsers from '../store/actions/FetchAllUsers'
import AddRemoveFriend from '../store/actions/addRemoveFriend'

import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons'


/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function SearchUsersScreen() {

    const dispatch = useDispatch()
    const username = useSelector((state) => state.meditations.username)
    const token = useSelector((state) => state.meditations.token)
    const allUsers = useSelector((state) => state.meditations.allUsers)

    /**
     * Fetch all meditations and all favorited meditations for the user.
     * 
     * When the user logs all meditations will be request and loaded 
     * as well all previously existing favorited meditations will be reloaded into
     * their favorite meditations
     */
    useEffect(() => {
        dispatch(FetchAllUsers(token))
    }, [dispatch])

    const addFriend = (username) => {
        dispatch(AddRemoveFriend(token))
        console.log('done')
    }
    const createFriendCards = (user) => {
        console.log(user.item.usernaqme, 'here')
        return (
            <View style={styles.friendCard}>
                <View>
                    <Text> {user.item.username}</Text>
                    <Image style={{ width: 80, height: 80 }} source={{ uri: user.item.user_photo }} />
                </View>
           
                <TouchableOpacity onPress={() => addFriend(user.item.username)}>
                    <View>
                        <Ionicons name='md-person-add' size={75} color={colors.primary} />
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
        height: Dimensions.get('window').height * .9,
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