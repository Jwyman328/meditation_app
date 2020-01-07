import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';

import FetchAllCourses from '../store/actions/FetchAllCourses'
import FetchFavorites from '../store/actions/fetchFavorites'
import FetchUserFriends from '../store/actions/FetchUserFriends'

import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function CreateMessageScreen() {

 
    return (
        <View styles={styles.imageContainer}>
           <Text>msg</Text>
        </View>
    )
}

export default CreateMessageScreen;

const styles = StyleSheet.create({
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
    welcomeContainer: {

    },
    title: {
        marginTop: 20,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    }
})