import React, {useState} from 'react'

import {createAppContainer, create, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator,} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'


import CoursesScreen from '../screens/CoursesScreen'
import FullCourseScreen from '../screens/FullCourseScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import StatsScreen from '../screens/StatsScreen'
import LoginScreen from '../screens/LogInScreen'
import SignupScreen from '../screens/signUpScreen'
import UserFriendsScreen from '../screens/UserFriendsScreen'
import SearchUsersScreen from '../screens/SearchUsersScreen'

import {Ionicons} from '@expo/vector-icons'
import {ScrollView, Text, StyleSheet, Dimensions, Button} from 'react-native'

import colors from '../constants/colors'

import FilterScreen from '../screens/FiltersModal'
import IndividualMeditationScreen from '../screens/IndividualMeditationScreen'
import MetitationCompletedScreen from '../screens/meditationCompletedScreen'

const CoursesStackNavigation = createStackNavigator({
    
    Courses: {
        screen:CoursesScreen,
        navigationOptions: {
                headerTitle:'Courses',
                headerTintColor: colors.primary,
                headerTitleStyle:{
                    fontFamily:'Helvetica-Oblique',
                    fontSize: 24,
                }
            }

    },
    FullCourse: {
        screen:FullCourseScreen,
        
    },
    IndividualMeditationScreen:IndividualMeditationScreen,
    MeditationCompleted: {
       screen: MetitationCompletedScreen,
       navigationOptions:{

           headerStyle:{
               backgroundColor:colors.primary
           }
       }
    
    },
    Filters: {
        screen:FilterScreen,
        navigationOptions: {
            headerTitle:'Filters',
            headerTintColor: colors.primary,
            headerTitleStyle:{
                fontFamily:'Helvetica-Oblique',
                fontSize: 24,
            }
        }
    }
       
}, {
    defaultNavigationOptions: {
       headerStyle:{
           backgroundColor: colors.lightSecondary,
       }
    }
})

const CommunityStackNavigation = createMaterialTopTabNavigator({
    myFriends: {screen: UserFriendsScreen} ,
    SearchUsers: {screen: SearchUsersScreen},
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
            Community: {
                screen: CommunityStackNavigation,//UserFriendsScreen,//StatsScreen,
                navigationOptions: {
                    tabBarIcon:<Ionicons color='black' size={25} name='ios-people'  />,
                    tabBarLabel:'Community'

                    
                }},
        Stats: {
            screen: UserFriendsScreen,//StatsScreen, 
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

        },
        tabBarOptions: {
            activeBackgroundColor: colors.lightSecondary,
            inactiveBackgroundColor: colors.lightSecondary,
            activeTintColor: '#001E85',
        }
   }
)

const AuthNavigator = createStackNavigator({
    Auth: LoginScreen,
    Signup: SignupScreen,
    logOut: SettingsScreen,
})

const MainNavigation = createSwitchNavigator({ // did this for the header it provides 
    Login: AuthNavigator,
    //SignUp: SignupScreen,
    Tabs:BottomTabs
},{
    navigationOptions:{
        headerTitle: 'hello world',
    }
});




export default createAppContainer(MainNavigation)

const styles = StyleSheet.create({
    courseScreensHeader : {
        marginTop:30,
    }
})