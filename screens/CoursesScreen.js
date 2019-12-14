import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Dimensions } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

import MainHeaderButton from '../components/HeaderButton';


import FiltersModal from '../components/FiltersModal'
function CoursesScreen(props){
    const [filtersVisible, setfiltersVisible] = useState(false)

    // set the action to a param 
    //props.navigation.setParams({'filtersVisible': setfiltersVisible})
    
    const goToCourse = () => {
        props.navigation.navigate('FullCourse')
    }
    return (
        <View>
            <Text>courses Page</Text>
            <Button title='view course' onPress={goToCourse} />
            

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
                 
            </ScrollView>
       }
   )
        
}
