import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions } from 'react-native';

import AudioPlayer from './AudioPlayer'
import { FlatList } from 'react-native-gesture-handler';

/**
 * Allow the user to play and pause the selected meditation audio
 * @param {string} data.uri courses image link
 * @param {string} data.meditationId the id for the selected meditation
 */
function IndividualMeditationScreen(props) {
    const data = props.navigation.getParam('data')
    const goToMeditationCompleted = (dataToPass) => props.navigation.navigate('MeditationCompleted', dataToPass)
    return (
        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: data.uri }}>
            <ScrollView >
                <View >
                    <Text></Text>
                    <AudioPlayer goToMeditationCompleted={goToMeditationCompleted} meditationData={data.meditationData} meditationId={data.meditationId}  />
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default IndividualMeditationScreen;


const styles = StyleSheet.create({
    quickBorder: {
        borderColor: 'black',
        borderWidth: 4,
        borderStyle: 'solid'
    },
    outerContainer: {
        width: '100%',
        height: Dimensions.get('window').height,
    }
})