import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions } from 'react-native';

import App from '../App2'
import { FlatList } from 'react-native-gesture-handler';

/**
 * Allow the user to play and pause the selected meditation audio
 * @param {string} data.uri courses image link
 * @param {string} data.meditationId the id for the selected meditation
 */
function IndividualMeditationScreen(props) {
    const data = props.navigation.getParam('data')
    
    
    return (
        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: data.uri }}>
            <ScrollView >
                <View >
                    <Text></Text>
                    <App meditationId={data.meditationId} style={styles.quickBorder} />
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