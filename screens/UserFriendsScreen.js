import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, Image } from 'react-native';

import FetchAllCourses from '../store/actions/FetchAllCourses'
import FetchFavorites from '../store/actions/fetchFavorites'

import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function UserFriendsScreen() {

    const dispatch = useDispatch()
    const username = useSelector((state) => state.meditations.username)
    const token = useSelector((state) => state.meditations.token)
    const friends = useSelector((state) => state.meditations.friendsList)

    /**
     * Fetch all meditations and all favorited meditations for the user.
     * 
     * When the user logs all meditations will be request and loaded 
     * as well all previously existing favorited meditations will be reloaded into
     * their favorite meditations
     */
    useEffect(() => {
       
    }, [dispatch])

    const createFriendCards = (friend) =>{
        console.log(friend.item.username)
        return (
            <View style={styles.friendCard}>
                <Text> {friend.item.username}</Text>
                <Image style={{width: 80, height: 80}} source={{uri:friend.item.user_photo}}/>

            </View>
        )

    }

    return (
        <View styles={styles.container}>
            <View style={styles.cardsContainer}>
                <Text>My Friends</Text>
            {friends ?  <FlatList numColumns={1} data={friends} keyExtractor={(item=> item.username)} renderItem={(friend) => createFriendCards(friend)} />: null}

            </View>
        </View>
    )
}

export default UserFriendsScreen;

const styles = StyleSheet.create({
    cardsContainer: {
        marginTop:Dimensions.get('window').height * .1,
        height:Dimensions.get('window').height * .9,
        justifyContent:'center',
        alignItems: 'center',
        width: Dimensions.get('window').width ,
    },
    friendCard : {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .65,
        borderRadius: 20,
        justifyContent: 'flex-end',
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
        height:500,
        width: Dimensions.get('window').width,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor:'green'
    },
    title: {
        marginTop: 20,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    }
})