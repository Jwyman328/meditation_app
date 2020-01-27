import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import FetchAllCourses from '../../store/actions/FetchAllCourses'
import FetchFavorites from '../../store/actions/fetchFavorites'
import FetchUserFriends from '../../store/actions/FetchUserFriends'
import FetchMyFeelings from '../../store/actions/FetchMyFeelings'
import FetchDailyStepGoal from '../../store/actions/fetchDailyStepGoal'
import FetchMoodData from '../../store/actions/FetchMoodData'
import FetchProfileData from '../../store/actions/FetchProfileData'

import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';

import audioBookPlaylist from '../../Data/AudioBookPlaylist'
import dummyData from '../../Data/dummyData'

import PedometerCircle from '../FitnessScreens/PedometerCircle'
import {createDailyMeditationCard,getDailyMeditation} from './homeScreenUtils/dailyMeditationHelperFunctions'

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function HomeScreen(props) {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)
    const [dailyMeditationData, setDailyMeditationData] = useState(undefined)

    let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal)

    const [dailyGoalLocal, setdailyGoalLocal] = dailyStepGoal ? useState(dailyStepGoal) : null

    /**
     * Navigate to the Journal Screen
     */
    const goToJournalScreen = () => {
        props.navigation.navigate('Feeling')
    }
    /**
     * Navigate to fitness screen
     */
    const goToFitnessScreen = () => {
        props.navigation.navigate('Fitness')
    }
    
    /**
     * When user logs in set daily meditation data.
     * Fetch all meditation courses.
     * Fetch all favorite meditations.
     * Fetch all friends of the user.
     * Fetch feelings data.
     * Fetch user's daily step goal.
     * Fetch users mood data.
     * Fetch user's profile data.
     */
    useEffect(() => {
        getDailyMeditation(setDailyMeditationData)
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
                source={ {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s' } }>
                <View style={{ height: Dimensions.get('window').height * .9, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    {/*<View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.title}>Welcome {username}</Text>
                    </View>*/}
                    <View style={styles.emotionFace}>
                        <Text testID='title' style={{ ...styles.title, color: colors.base }}>I'm feeling?</Text>
                        <TouchableOpacity testID='iconFaceTouchable' onPress={goToJournalScreen}>
                            <MaterialCommunityIcons testID='faceIcon' size={130} color={colors.lightSecondary} name={'emoticon-happy'} title='play' />
                        </TouchableOpacity>
                    </View>
                        <View style={{ flex: .5 }}>
                        <TouchableOpacity testID="pedometerTouchable" onPress={goToFitnessScreen}>
                            <View>
                                {dailyStepGoal ? <PedometerCircle testID='pedometer' card={false} dailyStepGoal={dailyStepGoal} /> : null}
                            </View>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.cardContainer}>
                        {dailyMeditationData ? createDailyMeditationCard(dailyMeditationData, props.navigation.navigate) : null}
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default HomeScreen;

//HomeScreen.navigationOptions = {header:null}

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
        marginTop: Dimensions.get('window').height * .07,
        color: colors.base,
        fontSize: 33,
        fontFamily: 'Helvetica-LightOblique',
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
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

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