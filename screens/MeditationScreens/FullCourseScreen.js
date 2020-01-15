import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import audioBookPlaylist from '../../Data/AudioBookPlaylist'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import MainHeaderButton from '../../components/HeaderButton';

import { Ionicons } from '@expo/vector-icons'

import { useDispatch, useSelector } from 'react-redux'
import addFavorite2 from '../../store/actions/addFavorite'
import FetchCourseData from '../../store/actions/fetchCourseData'

import colors from '../../constants/colors'
/**
 * Display all available meditaion audios for the selected course.
 * 
 * @param {Array} data.AudioCoursesId Array of audios ids for this course
 * @param {String} data.courseId id for the entire course
 * @param {String} data.image_uri link refering to background image
 * @param {String} data.title course title
 */
function FullCourseScreen(props) {
    const data = props.navigation.getParam('courseData')

    const courseId = data.courseId
    const courseData = useSelector((state)=> state.meditation.courseData)
    const dispatch = useDispatch()
    const token = useSelector(state => state.AuthData.token)


    /**
     * Adds this course to the array of favorited courses
     * @function addFavorite store action to add a course id to favorite courses
     */
    const addCourseToFavorites = () => {
        dispatch(addFavorite2(courseId, token))
    }

    const favoriteMeditations = useSelector(state => state.meditation.favoriteMeditations)

    /**
     * send relavant data to the navigationOptiosn to handle favoriting.
     *  relevant data includes addCourseToFavorites function, favoriteMeditations array and 
     * this course's courseId in order to handle the favoriting settings which are relevant to 
     * the header heart icon.
     * 
     */
    useEffect(() => {
        if (data) {
            const favoriteMeditationsIdArray = favoriteMeditations.map((item) => item.id)
            dispatch(FetchCourseData(data.courseId))
            props.navigation.setParams({ addCourseToFavorites: addCourseToFavorites, 
                favoriteMeditations: favoriteMeditationsIdArray, courseId: courseId, courseTitle: data.title })
        } else {
            //
        }

    }, [data, favoriteMeditations])


    /**
     * Send the user to the individual meditation screen to play the meditation audio.
     * @param {String} meditaionId Id for the meditation audio selected
     */
    const goToMeditation = (meditaionId) => {
        props.navigation.navigate('IndividualMeditationScreen', { data: { meditationData: meditaionId, uri: data.image_uri } })
    }

    /**
     * Convert seconds to string representing minutes and seconds.
     * 
     * Example: '08:35'
     * @param {number} secs 
     */
    const convertSecToMinSec = (secs) => {
        if (secs >= 60) {
            var minutes = Math.floor(secs / 60)
            var seconds = secs - minutes * 60
            minutes = Math.floor(minutes)
            let minutesCheck10 = minutes < 10 ? `${minutes}` : minutes
            let secondsCheck10 = seconds < 10 ? `0${seconds}` : seconds
            return `${minutesCheck10}:${secondsCheck10}`
          } else {
            // if you hacent reached a minue yet just display the seconds
            let secondsCheck10 = secs < 10 ? `0${secs}` : secs
            return `00:${secondsCheck10}`

        }}

    /**
     * Create a display card for each meditation audio in the course.
     * 
     * Display the meditation audios' order number, title, play time.
     * Allow ability to select audio and go to said audios play screen.
     * @param {String} item audioCourseId for the selected audio meditation
     */
    const createMeditationCard = (item) => {
        const title = item.title //audioBookPlaylist[item].title
        const seconds = item.time //audioBookPlaylist[item].time
        const orderNumber = item.orderNumber //audioBookPlaylist[item].orderNumber
        const time = convertSecToMinSec(seconds)

        return (
            <TouchableOpacity onPress={() => goToMeditation(item)} style={{ width: '100%' }} >
                <View style={styles.meditationcard}>
                    <View style={styles.cardText}>
                        <Text style={{ color: 'white', fontSize: 20, }}>{orderNumber}</Text>
                    </View>
                    <Text style={{ fontFamily:'Helvetica-LightOblique', color: 'white', fontSize: 20 }}>{title}</Text>
                    <Text style={{ color:'white' , fontSize: 20 }}>{time}</Text>
                    <View style={{ marginRight: 4 }}>
                        <Ionicons size={40} onPress={() => goToMeditation(item)} name='ios-headset' title='play' />
                    </View>
                </View>
            </TouchableOpacity>)
    }

    return (
        courseData?
        <View style={{ flex: 1 }} >
            <ImageBackground style={styles.backgroundImageStyle} source={{ uri: data.image_uri }}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{data.title}</Text>
                </View>
                <View style={styles.meditionContainer}>
                    <FlatList keyExtractor={(item) => item.title.toString() } contentContainerStyle={{ alignItems: 'center' }} data={courseData} renderItem={({ item }) => createMeditationCard(item)} />
                </View>
            </ImageBackground>
        </View>: null
    )
}

export default FullCourseScreen;

/**
 * Set a heart icon for allowing the ability to favorite and unfavorite the course.
 */
FullCourseScreen.navigationOptions = (navData) => {
    const addCourseToFavorites = navData.navigation.getParam('addCourseToFavorites')
    const courseTitle = navData.navigation.getParam('courseTitle')
    const favoriteMeditations = navData.navigation.getParam('favoriteMeditations')
    const courseId = navData.navigation.getParam('courseId')

    /**
     * Add the course to the meditation Favorites.
     */
    const addFavorite = () => {
        addCourseToFavorites()
    }

    /**
     * Handle the heart Icon's color.
     * @Return a black color for the heart icon, or a pink color based on if the course is favorited.
     */
    const isInfavorites = () => {
        if (favoriteMeditations && favoriteMeditations.includes(courseId)) {
            return '#e75480'
        } else {
            return 'black'
        }
    }

    /**
     * Handle the Heart Icon.
     * @returns a full heart icon or a outline heart icon based on if the course is favorited.
     */
    const getHeartIcon = () => {
        if (favoriteMeditations && favoriteMeditations.includes(courseId)) {
            return 'ios-heart'
        } else {
            return 'ios-heart-empty'
        }
    }
    return (
        {   headerTitle:courseTitle ,
            headerTintColor: colors.primary,
            headerTitleStyle:{
                fontFamily:'Helvetica-Oblique',
                fontSize: 24,
            },
            headerRight:
                <ScrollView style={styles.headerRight} horizontal={true}>
                    <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
                        <Item size={25}  title='filter' color={isInfavorites()} iconName={getHeartIcon()} onPress={addFavorite} />
                    </HeaderButtons>
                </ScrollView>,
        }
    )
}

const styles = StyleSheet.create({
    meditionContainer:{
         flex: 1,  
         justifyContent: 'center', 
         alignItems: 'center' 
    },
    title:{ 
        textAlign: 'center', 
        color: 'white', 
        fontSize: 30 
    },
    textContainer:{
         justifyContent: 'center', 
         alignItems: 'center', 
         flex: .2 
    },
    backgroundImageStyle:{
        justifyContent: 'center',
         alignItems: 'center', 
         flex: 1 
    },
    cardText:{
        marginLeft:Dimensions.get('window').width * .02, 
        width: Dimensions.get('window').width * .1,//40 ,
        height:'55%' ,
        borderWidth:2, 
        borderColor:colors.darkStrongPrimary,
        justifyContent:'center', 
        alignItems:'center', 
        borderStyle:'solid', 
        borderRadius:Dimensions.get('window').width * .8, 
        backgroundColor:colors.primary
    },
    meditationcard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: Dimensions.get('window').width * .2,
        height: Dimensions.get('window').height * .10,
        backgroundColor: 'grey',
        opacity: .7,
        width: Dimensions.get('window').width * .9,
        marginTop: Dimensions.get('window').height * .01,
    },
    headerRight:{ 
        marginTop: Dimensions.get('window').height * .02 
    }
})