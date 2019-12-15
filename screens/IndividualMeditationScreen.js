import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';

import App from '../App2'
import { FlatList } from 'react-native-gesture-handler';

function IndividualMeditationScreen(props){
    const data = props.navigation.getParam('data')
    console.log(data.meditationId)


    return (
        <ScrollView>
        <ImageBackground style={{width:'100%', height:'100%'}} source={{uri:data.uri}}>
        <View >
            <Text></Text>
            <App meditationId={data.meditationId} style={styles.quickBorder} />
            
        </View>
        </ImageBackground>
        </ScrollView>
    )
}

export default IndividualMeditationScreen;

const styles = StyleSheet.create({
    quickBorder: {
        borderColor:'black',
        borderWidth:4,
        borderStyle:'solid'
    }
})