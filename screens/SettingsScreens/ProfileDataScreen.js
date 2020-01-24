import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import MainButton from '../../components/MainButton'
import LogOutUser from '../../store/actions/logOut'

import CatagoryValue from '../../components/catagoryValue'
import ValueTitle from '../../components/valueTitle'

function ProfileDataScreen(props) {
    // get status of fitness data fetching
    let fetchDailyStepsLoading = useSelector((state) => state.Fitness.fetchDailyStepsLoading)
    let fetchDailyStepsError = useSelector((state) => state.Fitness.fetchDailyStepsError)
    // get status of health profile data fetching
    let fetchUserDataError = useSelector((state) => state.ProfileData.fetchUserDataError)
    let fetchUserDataLoading = useSelector((state) => state.ProfileData.fetchUserDataLoading)
    // get profile health data from state
    const healthData = useSelector((state) => state.ProfileData.userHealthData)
    // if each health data profile catagory exists, place it in own variable
    const weight = healthData.weight ? healthData.weight : null
    const heightFeet = healthData.height ? healthData.height.feet : null
    const heightInch = healthData.height ? healthData.height.inch : null
    const DOBMonth = healthData.DOB ? healthData.DOB.month : null
    const DOBYear = healthData.DOB ? healthData.DOB.year : null
    const gender = healthData ? healthData.gender : null
    // get general user data and place in own variable
    const generalUserData = useSelector((state) => state.ProfileData.generalUserData)
    let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal)
    const firstName = generalUserData.first_name
    const lastName = generalUserData.last_name

    // get general page data
    const isLoggedIn = useSelector(state => state.AuthData.loggedIn)
    const token = useSelector(state => state.AuthData.token)
    const dispatch = useDispatch()

    const logOutUser = () => {
        props.navigation.navigate('Auth')
        dispatch(LogOutUser())
    }
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


    //if the user is logged out send back to loginScreen
    useEffect(() => {
        if (isLoggedIn) {
            //
        } else {
            props.navigation.navigate('Auth')
        }
    }, [isLoggedIn])

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
                            <MainButton testID='logOutButton' onPress={logOutUser} title='logout' />
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