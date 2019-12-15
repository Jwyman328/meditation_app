import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import App from '../App2'

function FullCourseScreen(props){
    const data = props.navigation.getParam('courseData')
    
    return (
        <View >
            <ImageBackground style={{width:'100%', height:'100%'}} source={{uri:data.uri}}>
            <Text>{data.title}</Text>
            <App />
            </ImageBackground>
        </View>
    )
}

export default FullCourseScreen;