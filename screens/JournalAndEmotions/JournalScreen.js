import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Slider } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';


/**
 * Allow user to select emotion for day, before Journaling.
 */
function JournalScreen(props) {
    const today = new Date()
    const [date, setDate] = useState(today.toLocaleDateString())
    const [happynessValue, sethappynessValue] = useState(3)
    let [faceEmotion, setFaceEmotion] = useState('neutral')
    const [face, setFace] = useState('emoticon-neutral')
    const faceEmotions = ['Terrible', 'Bad', 'Neutral', 'Good', 'Excellent']
    const faces = ['emoticon-dead', 'emoticon-sad', 'emoticon-neutral', 'emoticon-happy', 'emoticon-excited']

    /**
     * Set value of the emotion text and icon face when user selects emotion with slider.
     */
    const returnFace = () => {
        setFaceEmotion(faceEmotions[happynessValue - 1])
        const face = faces[happynessValue - 1]
        setFace(face)
    }

    /**
     * Adjust emotion face icon and emotion text when emotion slider value changed.
     */
    useEffect(() => {
        returnFace()
    }, [happynessValue])

    /**
     * Navigate to screen to start writting a Journal for date.
     */
    const handleCreateJournal = () => {
        props.navigation.navigate('WriteJournalScreen')
    }
    return (
        <View style={styles.outerContainer}>

            <View style={styles.msgContainer}>
                <Text testID={'date'} style={styles.dateTitle}>{date}</Text>
                <Text testID='title' style={styles.emotionTextTitle}>How are you feeling?</Text>
                <Text testID='emotionTitle' style={styles.emotionText}>{faceEmotion}</Text>

                <MaterialCommunityIcons testID="faceIcon" size={150} color={colors.lightSecondary} name={face} title='play' />

                <Slider
                    testID='emotionSlider'
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={5}
                    step={1}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor="red"
                    value={happynessValue}
                    onValueChange={(sliderValue) => sethappynessValue(sliderValue)}
                />
            </View>
            <Button testID="navigateButton" title='Start Journaling' onPress={handleCreateJournal} />

        </View>
    )
}

export default JournalScreen;

const styles = StyleSheet.create({
    Titles: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    dateTitle: {
        fontSize: 25,
    },
    emotionText: {
        fontSize: 25,
    },
    emotionTextTitle: {
        fontSize: 25,
    },
    outerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        marginTop: 100,
    },
    slider: {
        width: 200,
        height: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    TextInput: {
        height: Dimensions.get('window').height * .09,
        width: Dimensions.get('window').width * .95,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 18,
        paddingTop: Dimensions.get('window').height * .005

    },
    JournalEntryTextBox: {
        height: Dimensions.get('window').height * .25,
    },
    msgContainer: {
        height: Dimensions.get('window').height * .7,
        width: Dimensions.get('window').width * .8,
        marginTop: Dimensions.get('window').height * .01,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
    },
    msgContainerModified: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .1,
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width,
        borderColor: 'gray',
        borderWidth: 1,
    },
})