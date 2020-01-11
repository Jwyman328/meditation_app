import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity } from 'react-native';

import FetchAllCourses from '../store/actions/FetchAllCourses'
import FetchFavorites from '../store/actions/fetchFavorites'
import FetchUserFriends from '../store/actions/FetchUserFriends'
import FetchMyFeelings from '../store/actions/FetchMyFeelings'
import FetchDailyStepGoal from '../store/actions/fetchDailyStepGoal'
import FetchMoodData from '../store/actions/FetchMoodData'


import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';

import audioBookPlaylist from '../Data/AudioBookPlaylist'
import dummyData from '../Data/dummyData'

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
                <View style={styles.dailyCard}>
                    <Image style={{ width: 90, height: 85, borderRadius:20, }} source={{ uri: dailyMeditationData.imageSource }} />
                    <View>
                        <Text>{dailyMeditationData.title}</Text>
                        <Text>{dailyMeditationData.author}</Text>
                    </View>

                </View>
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


    }, [dispatch])



    return (
        <View styles={styles.imageContainer}>
            <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s' }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={styles.title}>Welcome {username}</Text>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.dailyMeditationTitleContainer}>
                        <Text style={styles.dailyMeditationTitle}>Daily Meditation</Text>
                    </View>
                    {dailyMeditationData ? createDailyMeditationCard() : null}
                </View>
            </ImageBackground>
        </View>
    )
}

export default HomeScreen;

//HomeScreen.navigationOptions = {header:null}

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        flexDirection: 'row',
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * .17,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius:20,
        backgroundColor: 'white',
    },
    cardContainer: {
        marginBottom: 100,
        marginLeft: Dimensions.get('window').width * .1,
    },
    dailyMeditationTitleContainer: {
        marginLeft:Dimensions.get('window').width * .1,
    },
    dailyMeditationTitle: {
        fontSize:30,
        fontFamily:'Helvetica-LightOblique',
        color: colors.base
    }
})