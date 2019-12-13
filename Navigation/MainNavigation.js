import React from 'react'

import {createAppContainer, create} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import CoursesScreen from '../screens/CoursesScreen'
import FullCourseScreen from '../screens/FullCourseScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import StatsScreen from '../screens/StatsScreen'

import {Ionicons} from '@expo/vector-icons'

const CoursesStackNavigation = createStackNavigator({
    Courses: CoursesScreen,
    FullCourse: FullCourseScreen,
})

const BottomTabs = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Courses: CoursesStackNavigation,
        Stats: StatsScreen,
        Settings: SettingsScreen,
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