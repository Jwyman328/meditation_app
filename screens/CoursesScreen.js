import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, FlatList } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

import MainHeaderButton from '../components/HeaderButton';
import CourseCard from '../components/CourseCard'
import colors from '../constants/colors'
import dummyData from '../Data/dummyData'

import {useSelector} from 'react-redux'


import FiltersModal from '../components/FiltersModal'

function CoursesScreen(props){
    const [filtersVisible, setfiltersVisible] = useState(false)
    // set the action to a param 
    //props.navigation.setParams({'filtersVisible': setfiltersVisible})
    const filteredCourses = useSelector((state) => state.meditations.filteredMeditations)

    const goToCourse = (title, uri, catagories) => {
        props.navigation.navigate('FullCourse', {courseData: {title:title, uri:uri, catagories:catagories}})

    }

    const createCards = (course) =>{
        return(
            <View style={{...styles.coursesContainer }}>
                    <CourseCard goToCourse={goToCourse} audio={course.item.audio} title ={course.item.title} uri = {course.item.ImageUri} catagories={course.item.catagories} />
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
        marginTop:7,
        
    },
    quickBorder: {
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'black',
    }
})
