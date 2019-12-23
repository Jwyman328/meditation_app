import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';

import FetchAllCourses from '../store/actions/FetchAllCourses'
import {useDispatch, useSelector} from 'react-redux'
import colors from '../constants/colors';

/**
 * Landing screen after the user logs in.
 * 
 * 
 */
function HomeScreen(){
    
    const dispatch = useDispatch()
    const username = useSelector((state) => state.meditations.username)

    useEffect(() => {
        dispatch(FetchAllCourses())
        console.log(username)
    }, [dispatch])

    return (
        <View styles={styles.imageContainer}>
        <ImageBackground style={styles.backgroundImage} 
        source = {{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s'}}>

       
        <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={styles.title}>Welcome {username}</Text>
        </View>
        </ImageBackground>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    welcomeContainer:{

    },
    title: {
        marginTop:20,
        color:colors.base,
        fontSize: 33,
        fontFamily: 'AppleSDGothicNeo-Bold',
    }
})