import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, ShadowPropTypesIOS } from 'react-native';
import MainButton from '../../components/MainButton'
import UpdateFeelings from '../../store/actions/journal_emotions_actions/UpdateFeeling'
import changeLocalMyFeelings from '../../store/actions/journal_emotions_actions/changeLocalMyFeelings'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons'
import FetchMyFeelings from '../../store/actions/meditation_actions/FetchMyFeelings'
import PostUserHealthData from '../../store/actions/getUserInfo_actions/postUserHealthData'
import FeelingsLabelIcons from './components/feelingsLabelIcons'
import useGetMyFeelingsScreenState from '../../customHooks/meditationScreensCustomHooks/useGetMyFeelingsScreenState';
//import handleColor from './utils/handleColor';

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function MyFeelingsScreen(props) {
    const {username,token,myFeelings,healthData,fetchFeelingsError,firstTime } = useGetMyFeelingsScreenState(props.navigation)
    const dispatch = useDispatch()

    const handleColor = (num, feeling) => {
        if (num <= myFeelings[feeling]) {
            return '#DF5286' //'#FE7F9C'//colors.primary
        }
        else {
            return 'black'
        }
    }

    const handleChange = (feeling, num) => {
        dispatch(changeLocalMyFeelings(feeling, num))
    }

    const handleNewValues = () => {
        dispatch(UpdateFeelings(myFeelings, token))
        // check if this is a signup process
        if (firstTime) {
            dispatch(PostUserHealthData(healthData, token))
        } else {
            //
        }
        props.navigation.navigate('Home')
    }

    const handleLater = () => {
        props.navigation.navigate('Tabs')
    }


    return (
        <View style={styles.mainContainer} >
            {myFeelings && !fetchFeelingsError ? <View>
                <View style={styles.feelingsCard}>
                    <FeelingsLabelIcons handleColor={handleColor} title='Depressed' catagory='depressed' handleChange={handleChange} />
                    <FeelingsLabelIcons handleColor={handleColor} title='Anxious' catagory='anxious' handleChange={handleChange} />
                    <FeelingsLabelIcons handleColor={handleColor} title='Lost' catagory='lost' handleChange={handleChange} />
                    <FeelingsLabelIcons handleColor={handleColor} title='Stressed' catagory='stressed' handleChange={handleChange} />
                    <FeelingsLabelIcons handleColor={handleColor} title='Excited' catagory='excited' handleChange={handleChange} />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <MainButton testID={'submitButton'} style={styles.mainButton} title='submit' onPress={handleNewValues} />
                    {firstTime ? <MainButton testID={'doLaterButton'} style={styles.mainButton} title='Do later' onPress={handleLater} /> : null}
                </View>
            </View> : <Text>error: no feelings exist</Text>}
        </View>
    )
}

export default MyFeelingsScreen;

const styles = StyleSheet.create({
    mainButton: {
        backgroundColor: colors.secondary,
        marginTop: Dimensions.get('window').height * .03// 20
    },
    mainContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: Dimensions.get('window').height,
    },
    IconContainer: {
        marginRight: Dimensions.get('window').height * .01
    },
    FeelingSize: {
        width: Dimensions.get('window').width * .2,//80,
        paddingTop: Dimensions.get('window').height * .01
    },
    feelingsText: {
        fontSize: 15,
        fontFamily: 'Helvetica-Oblique',
    },
    feelingsCard: {
        justifyContent: 'center',
        width: Dimensions.get('window').width * .90,
        height: Dimensions.get('window').height * .4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: { width: Dimensions.get('window').width * .025, height: Dimensions.get('window').width * .025, },
        shadowOpacity: .6,
        marginTop: Dimensions.get('window').height * .14,
        backgroundColor: colors.lightSecondary

    },
    feelingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: Dimensions.get('window').height * .016,//10,
        paddingLeft: Dimensions.get('window').height * .016,
    },
    title: {
        marginTop: Dimensions.get('window').height * .02,
        fontSize: 20,
    }

})