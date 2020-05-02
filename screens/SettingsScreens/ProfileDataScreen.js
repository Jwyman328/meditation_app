import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import MainButton from '../../components/MainButton'
import LogOutUser from '../../store/actions/auth_actions/logOut'
import logOutUser from './utils/logOutUser';

import CatagoryValue from '../SettingsScreens/components/catagoryValue'
import ValueTitle from '../SettingsScreens/components/valueTitle' 
import useGetProfileDataScreenState from '../../customHooks/settingScreensCustomHooks/useGetProfileDataScreenState';
/**
 * Display all profile data with ability to navigate to screen to modify values.
 * 
 * Include height, weight, DOB, sex, first name, lastname, and daily step goal.
 */
function ProfileDataScreen(props) {
    const  {
        fetchDailyStepsLoading,
        fetchDailyStepsError,
        fetchUserDataError,
        fetchUserDataLoading,
        healthData,
        weight,
        heightFeet,
        heightInch,
        DOBMonth,
        DOBYear,
        gender,
        generalUserData,
        dailyStepGoal,
        firstName,
        lastName,
        isLoggedIn,
        token,
      } = useGetProfileDataScreenState();
    const dispatch = useDispatch()

    /**
     * Navigate to a specific profile data object updating screen.
     * @param {String} navigateTo screen to navigate to.
     * @param {object} firstTime Indicate if this is a navigation from signUp screen.
     */
    const profileDataChangeNavigator = (navigateTo, firstTime={ firstTime: false }) => {
        props.navigation.navigate(navigateTo, firstTime)
    }
    // create Functions to navigate to different profile data updating screen
    const changeGender = () => profileDataChangeNavigator('chooseGender')
    const changeWeight = () => profileDataChangeNavigator('ChooseWeight')
    const changeHeight = () => profileDataChangeNavigator('ChooseHeight')
    const changeDOB = () => profileDataChangeNavigator('ChooseDOB')
    const changeStepGoal = () => profileDataChangeNavigator('ChangeStepGoalScreen')

    return (
        isLoggedIn ?
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {fetchUserDataLoading ? <Text>Data loading</Text> : fetchUserDataError ? <Text>Error loading Data</Text> :
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <ValueTitle titleText='Profile Data' />
                        <CatagoryValue changeNavigation={null} label='First Name' value={firstName} />
                        <CatagoryValue changeNavigation={null} label='Last Name' value={lastName} />
                        <CatagoryValue changeNavigation={changeWeight} label='Weight' value={`${weight}lbs`} />
                        <CatagoryValue changeNavigation={changeHeight} label='Height' value={`${heightFeet}ft ${heightInch}in`} />
                        <CatagoryValue changeNavigation={changeDOB} label='D.O.B' value={`${DOBMonth}/${DOBYear}`} />
                        <CatagoryValue changeNavigation={changeGender} label='Sex' value={gender} />

                        <ValueTitle titleText='Goals' />
                        {fetchDailyStepsLoading ? <Text>Loading step data</Text> :
                            fetchDailyStepsError ? <Text>Error getting daily steps data</Text> :
                                <CatagoryValue changeNavigation={changeStepGoal} label='Daily Steps' value={dailyStepGoal} />}

                        <View style={styles.logoutButtonContainer}>
                            <MainButton testID='logOutButton' onPress={() => logOutUser(props.navigation, dispatch)} title='logout' />
                        </View>
                    </View>}

            </View> : null
    )
}

export default ProfileDataScreen;

const styles = StyleSheet.create({

    logoutButtonContainer: {
        marginTop: Dimensions.get('window').height * .05
    }

})