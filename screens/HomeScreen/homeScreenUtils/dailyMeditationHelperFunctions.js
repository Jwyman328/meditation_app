import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity } from 'react-native';

import audioBookPlaylist from '../../../Data/AudioBookPlaylist'
import dummyData from '../../../Data/dummyData'
import colors from '../../../constants/colors';
/**
 * Get a random individual meditation's data and set it to state.
 * 
 * @param {function} setDailyMeditationData function to set daily meditation data to state.
 */
const getDailyMeditation = (setDailyMeditationData) => {
    //const image_uri = dummyData[0].ImageUri
    const meditationNumber = getRandomInt(1, 19)
    setDailyMeditationData(audioBookPlaylist[meditationNumber])
    //const meditaionId = audioBookPlaylist[meditationNumber]
}


/**
 * Return a random whole number between the minimum and maximum numbers passed.
 * 
 * @param {number} min minimum number posible to return.
 * @param {number} max maximum number posible to return.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Navigate to IndividualMeditationScreen passing it the selected daily meditation data.
 * @param {object} dailyMeditationData meditation data.
 * @param {function} navigator screen navigation function.
 */
const goToDailyMeditation = (dailyMeditationData, navigator) => {
    const image_uri = dummyData[0].ImageUri // use this as a current constant to mock real photo
    navigator('IndividualMeditationScreen', { data: { meditationData: dailyMeditationData, uri: image_uri } })
}

/**
 * Create a display card for the individual daily meditation.
 * 
 * @param {object} dailyMeditationData individual daily meditation data randomly selected.
 * @param {function} navigator props.navigation.navigate to navigate to other screens.
 */
const createDailyMeditationCard = (dailyMeditationData,navigator) => {
    return (
        <TouchableOpacity testID='navigateToDailyMeditation' onPress={() => goToDailyMeditation(dailyMeditationData,navigator)}>
            <ImageBackground testID='dailyMeditationImage' imageStyle={{ borderRadius: 90 }} source={{ uri: dailyMeditationData.imageSource }} style={styles.dailyCardImage}>
                <View style={styles.dailyCard}>
                    <View>
                        <Text testID='dailyMeditationTitle' style={styles.DailyTitle}>{dailyMeditationData.title}</Text>
                        {/*<Text>{dailyMeditationData.author}</Text>*/}
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export  {createDailyMeditationCard,getDailyMeditation}

const styles = StyleSheet.create({
    dailyCardImage: {
        width: Dimensions.get('window').width * .75,
        height: Dimensions.get('window').height * .1,
        borderRadius: 90, 
    },
    DailyTitle: {
        fontSize: 30,
        fontFamily: 'Helvetica-LightOblique',
        color: 'white',
    },
    dailyCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .75,
        height: Dimensions.get('window').height * .1, //85
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: Dimensions.get('window').width * .1 //90
    },
})