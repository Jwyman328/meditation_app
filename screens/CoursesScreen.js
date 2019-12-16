import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, FlatList } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import MainHeaderButton from '../components/HeaderButton';
import CourseCard from '../components/CourseCard';
import colors from '../constants/colors';
import dummyData from '../Data/dummyData';

import {useSelector} from 'react-redux';



import FiltersModal from '../components/FiltersModal'

/**
 * A screan that lists all available courses for the user to select. 
 * @returns a screen containing all the Available courses based on Filters selected
 */
function CoursesScreen(props){
    const [filtersVisible, setfiltersVisible] = useState(false)
  
    const filteredCourses = useSelector((state) => state.meditations.filteredMeditations)

    /**
     * Navigate to the Full course screen of the selected course.
     * @param {string} title course title
     * @param {string} uri background image link
     * @param {Array} catagories course catagories eg.[Anxiety, Begginer]
     * @param {Array} AudioCoursesId Ids refering to the audio files for this course
     * @param {string} courseId Id of the course
     */
    const goToCourse = (title, uri, catagories, AudioCoursesId,courseId) => {
        props.navigation.navigate('FullCourse', {courseData: {title:title, uri:uri, catagories:catagories, AudioCoursesId : AudioCoursesId, courseId:courseId }})
    }

    /**
     * Create a touchable display card for a course.
     * @param {Array<Object>} course a meditation course
     */
    const createCards = (course) =>{
        return(
            <View style={{...styles.coursesContainer }}>
                    <CourseCard goToCourse={goToCourse} audioIds={course.item.AudioCoursesId} audio={course.item.audio} title ={course.item.title} uri = {course.item.ImageUri} catagories={course.item.catagories} courseId={course.item.courseId} />
                </View>
        )
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: colors.darkStrongPrimary}}>
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}} style={{width:'100%',flex: 1, ...styles.quickBorder }}>
                {filteredCourses? <FlatList numColumns={2} data={filteredCourses} keyExtractor={(item=> item.title)} renderItem={(course) => createCards(course)} />: null}
            </ScrollView> 
        </View>
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

