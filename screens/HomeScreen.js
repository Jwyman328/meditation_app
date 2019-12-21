import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';

import FetchAllCourses from '../store/actions/FetchAllCourses'
import {useDispatch} from 'react-redux'

/**
 * Landing screen after the user logs in.
 * 
 * 
 */
function HomeScreen(){
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchAllCourses())
    }, [dispatch])

    return (
        <View styles={styles.imageContainer}>
        <ImageBackground style={styles.backgroundImage} 
        source = {{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s'}}>

       
        <View>
            <Text>Home Page</Text>
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
    }
})