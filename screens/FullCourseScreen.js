import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native';


function FullCourseScreen(props){
    const data = props.navigation.getParam('courseData')
    
    return (
        <View >
            <ImageBackground style={{width:'100%', height:'100%'}} source={{uri:data.uri}}>
            <Text>{data.title}</Text>
            </ImageBackground>
        </View>
    )
}

export default FullCourseScreen;