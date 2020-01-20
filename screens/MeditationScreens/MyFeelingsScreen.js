import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, ShadowPropTypesIOS } from 'react-native';
import MainButton from '../../components/MainButton'

import UpdateFeelings from '../../store/actions/UpdateFeeling'
import changeLocalMyFeelings from '../../store/actions/changeLocalMyFeelings'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons'
import FetchMyFeelings from '../../store/actions/FetchMyFeelings'
import PostUserHealthData from '../../store/actions/postUserHealthData'

/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function MyFeelingsScreen(props) {

    const dispatch = useDispatch()

    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)
    const myFeelings = useSelector((state) => state.meditation.myFeelings)
    const healthData = useSelector((state) => state.ProfileData.userHealthData)

    // handle feelings screen
    const fetchFeelingsError = useSelector((state) => state.meditation.fetchFeelingsError)



    const firstTime = props.navigation.getParam('firstTime')

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

    useEffect(() => {
        console.log(fetchFeelingsError, 'ffe')
    })
    return (
        <View style={styles.mainContainer} >

            {myFeelings && !fetchFeelingsError ? <View><View style={styles.feelingsCard}>

                <View style={styles.feelingsRow}>
                    <View style={styles.FeelingSize}>
                        <Text style={styles.feelingsText}>Depressed</Text>
                    </View>

                    <Ionicons size={35} onPress={() => handleChange('depressed', 1)} color={handleColor(1, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('depressed', 2)} color={handleColor(2, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('depressed', 3)} color={handleColor(3, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('depressed', 4)} color={handleColor(4, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('depressed', 5)} color={handleColor(5, 'depressed')} name='ios-star-outline' title='play' />

                </View>
                <View style={styles.feelingsRow}>
                    <View style={styles.FeelingSize}>

                        <Text style={styles.feelingsText}>Anxious</Text>
                    </View>
                    <Ionicons size={35} onPress={() => handleChange('anxious', 1)} color={handleColor(1, 'anxious')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('anxious', 2)} color={handleColor(2, 'anxious')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('anxious', 3)} color={handleColor(3, 'anxious')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('anxious', 4)} color={handleColor(4, 'anxious')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('anxious', 5)} color={handleColor(5, 'anxious')} name='ios-star-outline' title='play' />

                </View>
                <View style={styles.feelingsRow}>
                    <View style={styles.FeelingSize}>
                        <Text style={styles.feelingsText}>Lost</Text>
                    </View>
                    <Ionicons size={35} onPress={() => handleChange('lost', 1)} color={handleColor(1, 'lost')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('lost', 2)} color={handleColor(2, 'lost')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('lost', 3)} color={handleColor(3, 'lost')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('lost', 4)} color={handleColor(4, 'lost')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('lost', 5)} color={handleColor(5, 'lost')} name='ios-star-outline' title='play' />

                </View>
                <View style={styles.feelingsRow}>
                    <View style={styles.FeelingSize}>
                        <Text style={styles.feelingsText}>Stressed</Text>
                    </View>
                    <Ionicons size={35} onPress={() => handleChange('stressed', 1)} color={handleColor(1, 'stressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('stressed', 2)} color={handleColor(2, 'stressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('stressed', 3)} color={handleColor(3, 'stressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('stressed', 4)} color={handleColor(4, 'stressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('stressed', 5)} color={handleColor(5, 'stressed')} name='ios-star-outline' title='play' />

                </View>
                <View style={styles.feelingsRow}>
                    <View style={styles.FeelingSize}>
                        <Text style={styles.feelingsText}>Excited</Text>
                    </View>
                    <Ionicons size={35} onPress={() => handleChange('excited', 1)} color={handleColor(1, 'excited')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('excited', 2)} color={handleColor(2, 'excited')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('excited', 3)} color={handleColor(3, 'excited')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('excited', 4)} color={handleColor(4, 'excited')} name='ios-star-outline' title='play' />
                    <Ionicons size={35} onPress={() => handleChange('excited', 5)} color={handleColor(5, 'excited')} name='ios-star-outline' title='play' />
                </View>

            </View>
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <MainButton style={styles.mainButton} title='submit' onPress={handleNewValues} />
            {firstTime ? <MainButton style={styles.mainButton} title='Do later' onPress={handleLater} /> : null}
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