import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import FetchAllCourses from '../store/actions/FetchAllCourses'
import FetchFavorites from '../store/actions/fetchFavorites'
import FetchUserFriends from '../store/actions/FetchUserFriends'
import FetchMyFeelings from '../store/actions/FetchMyFeelings'
import FetchDailyStepGoal from '../store/actions/fetchDailyStepGoal'
import FetchMoodData from '../store/actions/FetchMoodData'
import FetchProfileData from '../store/actions/FetchProfileData'

import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';

import audioBookPlaylist from '../Data/AudioBookPlaylist'
import dummyData from '../Data/dummyData'

import App2 from '../screens/App2'


/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function HomeScreen(props) {

    const dispatch = useDispatch()
    const username = useSelector((state) => state.meditations.username)
    const token = useSelector((state) => state.meditations.token)
    const [dailyMeditationData, setDailyMeditationData] = useState(undefined)

    let dailyStepGoal = useSelector((state) => state.meditations.dailyStepGoal)

    const [dailyGoalLocal, setdailyGoalLocal] = dailyStepGoal ? useState(dailyStepGoal) : null


    /**
     * Fetch all meditations and all favorited meditations for the user.
     * 
     * When the user logs all meditations will be request and loaded 
     * as well all previously existing favorited meditations will be reloaded into
     * their favorite meditations
     */

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const goToJournalScreen = () => {
        props.navigation.navigate('Feeling')
    }
    const goToFitnessScreen = () => {
        props.navigation.navigate('Fitness')
    }

    const goToDailyMeditation = () => {

        const image_uri = dummyData[0].ImageUri
        props.navigation.navigate('IndividualMeditationScreen', { data: { meditationData: dailyMeditationData, uri: image_uri } })
    }



    const getDailyMeditation = () => {
        // get random number

        const image_uri = dummyData[0].ImageUri
        const meditationNumber = getRandomInt(1, 19)
        setDailyMeditationData(audioBookPlaylist[meditationNumber])
        const meditaionId = audioBookPlaylist[meditationNumber]

    }

    const createDailyMeditationCard = () => {
        return (
            <TouchableOpacity onPress={goToDailyMeditation}>
                <ImageBackground imageStyle={{ borderRadius: 90 }} style={{ width: Dimensions.get('window').width * .75, height: 85, borderRadius: 90, }} source={{ uri: dailyMeditationData.imageSource }}>
                    <View style={styles.dailyCard}>
                        <View>
                            <Text style={styles.DailyTitle}>{dailyMeditationData.title}</Text>
                            {/*<Text>{dailyMeditationData.author}</Text>*/}
                        </View>

                    </View>
                </ImageBackground>

            </TouchableOpacity>
        )
    }
    useEffect(() => {
        getDailyMeditation()
        dispatch(FetchAllCourses())
        dispatch(FetchFavorites(token))
        dispatch(FetchUserFriends(token))
        dispatch(FetchMyFeelings(token))
        dispatch(FetchDailyStepGoal(token))
        dispatch(FetchMoodData(token))
        dispatch(FetchProfileData(token))
        
    }, [dispatch])



    return (
        <View styles={styles.imageContainer}>
            <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s' }}>
                <View style={{ height: Dimensions.get('window').height * .9, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    {/*<View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.title}>Welcome {username}</Text>
                    </View>*/}
                    <View style={styles.emotionFace}>
                        <Text style={{ ...styles.title, color: colors.base }}>I'm feeling?</Text>
                        <TouchableOpacity onPress={goToJournalScreen}>
                            <MaterialCommunityIcons size={130} color={colors.lightSecondary} name={'emoticon-happy'} title='play' />
                        </TouchableOpacity>
                    </View>
                        <View style={{ flex: .5 }}>
                        <TouchableOpacity onPress={goToFitnessScreen}>
                            <View>
                                {dailyStepGoal ? <App2 card={false} dailyStepGoal={dailyStepGoal} /> : null}
                            </View>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.cardContainer}>
                        {/*<View style={styles.dailyMeditationTitleContainer}>
                        <Text style={styles.dailyMeditationTitle}>Daily Meditation</Text>
                 </View>*/}
                        {dailyMeditationData ? createDailyMeditationCard() : null}
                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}

export default HomeScreen;

//HomeScreen.navigationOptions = {header:null}

const styles = StyleSheet.create({
    DailyTitle: {
        fontSize: 30,
        fontFamily: 'Helvetica-LightOblique',
        color: 'white',
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .93,
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .9,
    },
    welcomeContainer: {

    },
    title: {
        marginTop: 20,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
    },
    dailyCard: {
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .75,
        height: Dimensions.get('window').height * .17,
        height: 85,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 90
        //backgroundColor: 'white',
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //marginBottom: 60,
        //marginLeft: Dimensions.get('window').width * .1,
    },
    dailyMeditationTitleContainer: {
        //marginLeft: Dimensions.get('window').width * .1,
    },
    dailyMeditationTitle: {
        fontSize: 30,
        fontFamily: 'Helvetica-LightOblique',
        color: colors.base
    },
    emotionFace: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})