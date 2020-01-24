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

    const healthData = useSelector((state) => state.ProfileData.userHealthData)
    const weight = healthData.weight ? healthData.weight : null
    const heightFeet = healthData.height ? healthData.height.feet : null
    const heightInch = healthData.height ? healthData.height.inch : null

    const DOBMonth = healthData.DOB ? healthData.DOB.month : null
    const DOBYear = healthData.DOB ? healthData.DOB.year : null
    const gender = healthData ? healthData.gender : null

    const generalUserData = useSelector((state) => state.ProfileData.generalUserData)
    let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal)
    let fetchDailyStepsLoading = useSelector((state) => state.Fitness.fetchDailyStepsLoading)
    let fetchDailyStepsError = useSelector((state) => state.Fitness.fetchDailyStepsError)


    const firstName = generalUserData.first_name
    const lastName = generalUserData.last_name

    let fetchUserDataError = useSelector((state) => state.ProfileData.fetchUserDataError)
    let fetchUserDataLoading = useSelector((state) => state.ProfileData.fetchUserDataLoading)


    const isLoggedIn = useSelector(state => state.AuthData.loggedIn)
    const token = useSelector(state => state.AuthData.token)
    const dispatch = useDispatch()

    const logOutUser = () => {
        props.navigation.navigate('Auth')
        dispatch(LogOutUser())
    }

    const changeGender = () => {
        props.navigation.navigate('chooseGender', { firstTime: false })
    }
    const changeWeight = () => {
        props.navigation.navigate('ChooseWeight', { firstTime: false })
    }
    const changeHeight = () => {
        props.navigation.navigate('ChooseHeight', { firstTime: false })
    }
    const changeDOB = () => {
        props.navigation.navigate('ChooseDOB', { firstTime: false })
    }
    const changeStepGoal = () => {
        props.navigation.navigate('ChangeStepGoalScreen')
    }
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