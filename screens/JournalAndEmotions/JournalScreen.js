import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { Slider } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';
import MainButton from '../../components/MainButton'


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
        console.log(faceEmotion)
        props.navigation.navigate('WriteJournalScreen',{'faceEmotion':faceEmotion, 'face':face, 'happynessValue':happynessValue})
    }
    return (
        <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'data:image/jpeg;base64,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' }}>
        <View style={styles.outerContainer}>
            
            <View style={styles.msgContainer}>
                <Text testID={'date'} style={styles.dateTitle}>{date}</Text>
                <Text testID='title' style={styles.emotionTextTitle}>How are you feeling?</Text>
                <Text testID='emotionTitle' style={styles.emotionText}>{faceEmotion}</Text>

                <MaterialCommunityIcons testID="faceIcon" size={150} color={colors.secondary} name={face} title='play' />

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
            <MainButton testID="navigateButton" title='Start Journaling' onPress={handleCreateJournal} />
            </View>

        </View>
        </ImageBackground>
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
        fontFamily:'Helvetica-LightOblique',

    },
    emotionText: {
        fontSize: 25,
        fontFamily:'Helvetica-LightOblique',

    },
    emotionTextTitle: {
        fontSize: 25,
        fontFamily:'Helvetica-LightOblique',
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
        //borderColor: 'gray',
        //borderWidth: 1,
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
        width: Dimensions.get('window').width * .9,
        marginTop: Dimensions.get('window').height * .01,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //borderColor: 'gray',
        borderWidth: 1,
    },
    msgContainerModified: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .1,
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width,
        borderColor: 'gray',
        //borderWidth: 1,
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
})