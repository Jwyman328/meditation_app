import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, FlatList } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import MainHeaderButton from '../components/HeaderButton';
import CourseCard from '../components/CourseCard';
import colors from '../constants/colors';
import dummyData from '../Data/dummyData';

import {useSelector} from 'react-redux';

import FiltersModal from './FiltersModal'

/**
 * A screan that lists all available courses for the user to select. 
 * @returns a screen containing all the Available courses based on Filters selected
 */
function CoursesScreen(props){
    const [filtersVisible, setfiltersVisible] = useState(false)
  
    const filteredCourses = useSelector((state) => state.meditations.filteredMeditations)
    const isLoggedIn = useSelector(state => state.meditations.loggedIn)

    
    /**
     * Navigate to the Full course screen of the selected course.
     * @param {string} title course title
     * @param {string} uri background image link
     * @param {Array} catagories course catagories eg.[Anxiety, Begginer]
     * @param {Array} AudioCoursesId Ids refering to the audio files for this course
     * @param {string} courseId Id of the course
     */
    const goToCourse = (courseId, image_uri) => {
        props.navigation.navigate('FullCourse', {courseData: {courseId:courseId, image_uri: image_uri }})
    }

    /**
     * Create a touchable display card for a course.
     * @param {Array<Object>} course a meditation course
     */
    const createCards = (course) =>{
        return(
            <View style={{...styles.coursesContainer }}>
                    <CourseCard goToCourse={goToCourse}  title ={course.item.title} uri = {course.item.image_uri} catagories={course.item.catagories} id={course.item.id} courseId={course.item.course_id} />

                </View>
        )
    }
    /**
     * Create a single meditation course card
     * @param {Object} course 
     */
    const createCard = (course) =>{
        return(
            <View style={{...styles.coursesContainer }}>
                    <CourseCard goToCourse={goToCourse}  title ={course.title} uri = {course.image_uri} catagories={course.catagories} id={course.id} courseId={course.course_id} />
                </View>
        ) 
    }
    return (
        isLoggedIn?
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: colors.darkStrongPrimary}}>
            <View style={{width:'100%',flex: 1, ...styles.quickBorder, justifyContent:'center', alignItems:'center' }}>
                {filteredCourses ?  filteredCourses.length > 1 ? <FlatList numColumns={2} data={filteredCourses} keyExtractor={(item=> item.title)} renderItem={(course) => createCards(course)} />: createCard(filteredCourses[0]) : null}
            </View> 
        </View>:null
    )
}

export default CoursesScreen;

/**
 * Set a touchable filter icon on the top header to display the filter screen.
 */
CoursesScreen.navigationOptions = (navData) => {
    //const [filterModal, setFilterModal] = useState(false)
    const navigateToFiltersPage = () => {
        navData.navigation.navigate('Filters')
    }
   return (
       {
           headerRight: 
                <ScrollView style={{marginTop:Dimensions.get('window').height * .02}} horizontal={true}>
                <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
                    <Item title='filter' color='black' iconName='ios-funnel' onPress={ navigateToFiltersPage } />
                </HeaderButtons>      
                </ScrollView>,
       }
   )
        
}

const styles = StyleSheet.create({
    coursesContainer: {
        width:'50%',
        //flexDirection: 'row',
        //height:Dimensions.get('window').height * .797,
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        
    },
    quickBorder: {
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'black',
    }
})

