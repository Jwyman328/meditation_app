import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

import {useDispatch, useSelector} from 'react-redux'
import fetchMeditationsAndAddToAllMeditations from '../store/actions/getFavorites'
import AddFavorite2 from '../store/actions/addFavorite'


function SettingsScreen(){
    // get the data whenever it loads 
    const dispatch = useDispatch()
    const tryIt = async() => {
        const response = await fetch('http://127.0.0.1:8000/all_meditation_courses/')
        const responseJson = await response.json()
        console.log(responseJson, 'inside')

    }

    //const favData = useSelector((state) => state.meditations.favoriteMeditations)
    useEffect(() => {
        //const favData = dispatch(fetchMeditationsAndAddToAllMeditations())
        //console.log(favData, 'her its is')
        dispatch(AddFavorite2())
    },[dispatch])
    return (
        <View>
            <Text>settings Page</Text>
            <Button title='try it' onPress={tryIt} />
        </View>
    )
}

export default SettingsScreen;