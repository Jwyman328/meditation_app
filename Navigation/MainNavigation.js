import React, {useState} from 'react'

import {createAppContainer, create} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import CoursesScreen from '../screens/CoursesScreen'
import FullCourseScreen from '../screens/FullCourseScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import StatsScreen from '../screens/StatsScreen'

import {Ionicons} from '@expo/vector-icons'
import {ScrollView, Text, StyleSheet, Dimensions, Button} from 'react-native'

import colors from '../constants/colors'

import FilterScreen from '../components/FiltersModal'

const CoursesStackNavigation = createStackNavigator({
    
    Courses: {
        screen:CoursesScreen,
        navigationOptions: {
                headerTitle:'Meditate',
                headerTintColor: colors.primary,
            }
    },
    FullCourse: {
        screen:FullCourseScreen,
        
    },
    Filters: {
        screen:FilterScreen,
        navigationOptions: {
            headerTitle:'Filter Meditations',
            headerTintColor: colors.primary,
           
        }
    }
       
})

const BottomTabs = createBottomTabNavigator(
    {   
        Home: {
            screen: HomeScreen,
            navigationOptions:{
                tabBarIcon: <Ionicons color='black' size={25} name='ios-home'  />,
            }
        }
            ,
        Courses: {
            screen: CoursesStackNavigation,
            navigationOptions:{
                tabBarIcon: <Ionicons color='black' size={25} name='ios-body'  />,
                tabBarLabel:'Meditate'
            }
        }
            ,
        Stats: {
            screen: StatsScreen,
            navigationOptions: {
                tabBarIcon:<Ionicons color='black' size={25} name='ios-stats'  />,
                
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
             tabBarIcon: <Ionicons color='black' size={25} name='ios-settings'  />
            
            }
        }
    },{
        navigationOptions:{
            headerTitle: 'hello world',

        }}
)

const MainNavigation = createStackNavigator({ // did this for the header it provides 
    Tabs:BottomTabs
},{
    navigationOptions:{
        headerTitle: 'hello world',
    }
});


export default createAppContainer(BottomTabs)

const styles = StyleSheet.create({
    courseScreensHeader : {
        marginTop:30,
    }
})