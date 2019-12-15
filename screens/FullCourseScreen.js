import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

function FullCourseScreen(props){
    const data = props.navigation.getParam('courseData')
    console.log(data.AudioCoursesId, 'ids')

    const goToMeditation = (meditaionId) => {
        props.navigation.navigate('IndividualMeditationScreen', {data:{meditationId: meditaionId, uri: data.uri}})
    }
    const createMeditationCard = (item) => {
        console.log(item)
        return (
        <TouchableOpacity onPress={() => goToMeditation(item)} style={{height:100, width: 300}} >
            <View>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>)
    }

    return (
        <View >
            <ImageBackground style={{width:'100%', height:'100%'}} source={{uri:data.uri}}>
            <Text>{data.title}</Text>
            <FlatList data={data.AudioCoursesId} renderItem={({item}) => createMeditationCard(item)} />
            </ImageBackground>
        </View>
    )
}

export default FullCourseScreen;