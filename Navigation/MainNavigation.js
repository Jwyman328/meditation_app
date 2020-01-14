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
import InboxScreen from '../screens/InboxScreen'
import MyFeelingsScreen from '../screens/MyFeelingsScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import Fitness from '../screens/FitnessCounter'
import JournalScreen from '../screens/JournalScreen'
import WriteJournalScreen from '../screens/WriteJournalScreen'
import JournalProgressScreen from '../screens/journalProgressScreen'

import IntroToQuestionsScreen from '../screens/GetUserInfoStack/IntroToQuestionsScreen'
import ChooseGenderScreen from '../screens/GetUserInfoStack/chooseGenderScreen'
import ChooseWeight from '../screens/GetUserInfoStack/chooseWeight'
import ChooseHeight from '../screens/GetUserInfoStack/chooseHeight'
import ChooseDOB from '../screens/GetUserInfoStack/chooseDOB'


import {Ionicons} from '@expo/vector-icons'
import {ScrollView, Text, StyleSheet, Dimensions, Button} from 'react-native'

import colors from '../constants/colors'

import FilterScreen from '../screens/FiltersModal'
import IndividualMeditationScreen from '../screens/IndividualMeditationScreen'
import MetitationCompletedScreen from '../screens/meditationCompletedScreen'
import CreateMessageScreen from '../screens/CreateMessageScreen'

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
    },
    FeelingsFilter:{
        screen:MyFeelingsScreen,
        navigationOptions: {
            headerTitle:"I'm Feeling" ,
            headerTintColor: colors.primary,
            headerTitleStyle:{
                fontFamily:'Helvetica-Oblique',
                fontSize: 24,
            }
    }},
       
}, {
    defaultNavigationOptions: {
       headerStyle:{
           backgroundColor: colors.lightSecondary,
       }
    }
})

const friendsStack = createStackNavigator({
    myFriends: {screen: UserFriendsScreen,
        navigationOptions:{
            header: null,
        }},
    CreateMessage: {screen:CreateMessageScreen,
       },

})
const CommunityStackNavigation = createMaterialTopTabNavigator({
    myFriends: {screen: friendsStack,
                navigationOptions:{
                    tabBarLabel:'Friends'
                }} ,
    SearchUsers: {screen: SearchUsersScreen,
        navigationOptions:{
        tabBarLabel:'Search'}},
    Inbox : {screen: InboxScreen},
 },{ 
    tabBarOptions: {
        style:{
            backgroundColor:colors.primary,
        },
        activeTintColor: colors.strongPrimary, //strongPrimary
        indicatorStyle: {backgroundColor:colors.strongPrimary}

      }
})

const FitnessStack = createStackNavigator({
    Fitness:{
        screen: Fitness
    },
    Community: {
        screen: CommunityStackNavigation,//UserFriendsScreen,//StatsScreen,
        navigationOptions: {
            tabBarIcon:<Ionicons color='black' size={25} name='ios-people'  />,
            tabBarLabel:'Community'
        }},
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons color='black' size={25} name='ios-settings'  />
            
            }
        }
   

})

const HomeStack = createStackNavigator({
    Home: HomeScreen,    
    IndividualMeditationScreen:IndividualMeditationScreen,


}, {defaultNavigationOptions:
  
        {header:null}
    }
)

const JournalStack = createStackNavigator({
    JournalProgressScreen: JournalProgressScreen,
    JournalScreen: JournalScreen,
    WriteJournalScreen:WriteJournalScreen
}, {
    defaultNavigationOptions:{
        headerTitle: 'Journal'
    }
})

const BottomTabs = createBottomTabNavigator(
    {   
        Home: {
            screen: HomeStack,
            navigationOptions:{
                tabBarIcon: <Ionicons color='black' size={25} name='ios-home'  />,
            }
        },
        Courses: {
            screen: CoursesStackNavigation,
            navigationOptions:{
                tabBarIcon: <Ionicons color='black' size={25} name='ios-body'  />,
                tabBarLabel:'Meditate'
            }
        }
            ,
        Fitness: {
            screen: FitnessStack,//StatsScreen, 
            navigationOptions: {
                tabBarIcon:<Ionicons color='black' size={25} name='ios-fitness'  />,
                
            }
        },

        Feeling: {
            screen:JournalStack,
            navigationOptions:{
                tabBarIcon: <Ionicons color='black' size={25} name='md-happy'  />,
                tabBarLabel:'Mental'
            }
        },
            
      
        

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
const getUserInfoStack = createStackNavigator({
        introToQuestions: {
            screen:IntroToQuestionsScreen,
            navigationOptions:{
                header: null,
            }
        },
        chooseGender: {
            screen:ChooseGenderScreen,
           
        },
        ChooseWeight: {
            screen:ChooseWeight
        },
        ChooseHeight:ChooseHeight,
        ChooseDOB:ChooseDOB,
})

const AuthNavigator = createStackNavigator({
    
    Auth: LoginScreen,
    Signup: SignupScreen,
    introQuestionsStack: {
        screen: getUserInfoStack ,
        navigationOptions:{
            header:null,
        }},
    logOut: SettingsScreen,
    ForgotPassword: ForgotPasswordScreen,
})

const MainNavigation = createSwitchNavigator({ // did this for the header it provides 
    Login: AuthNavigator,
    //SignUp: SignupScreen,
    introQuestionsStack: {
        screen: getUserInfoStack ,
        navigationOptions:{
            header:null,
        }},
    Feelings: MyFeelingsScreen,
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