import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

import {useDispatch, useSelector} from 'react-redux'
import LogOutUser from '../store/actions/logOut'
import AddFavorite2 from '../store/actions/addFavorite'
import MainButton from '../components/MainButton'


function SettingsScreen(props){
    // get the data whenever it loads 
    const isLoggedIn = useSelector(state => state.meditations.loggedIn)
    const dispatch = useDispatch()
    const logOutUser = () => {
        console.log('logout')
        dispatch(LogOutUser())
    }

    useEffect(() => {
        if (isLoggedIn){
            console.log('logged in')
        }else{
            console.log('logged out')
            props.navigation.navigate('Auth')
        }
    }, [isLoggedIn])

    return (

        <View style={{margin: 100}}>
            <Text>settings Page</Text>
            <MainButton onPress={logOutUser} title='logout'/>
        </View>
    )
}

export default SettingsScreen;