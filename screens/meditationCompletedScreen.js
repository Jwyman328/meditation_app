import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Dimensions,Image, ScrollView  } from 'react-native';
import audioBookPlaylist from '../Data/AudioBookPlaylist'
import colors from '../constants/colors'
import MainHeaderButton from '../components/HeaderButton'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'

import imageUrls from '../images/inspirationalImages/image_urls'

function MeditationCompletedScreen(props) {
    const meditationId = props.navigation.getParam('meditationId')
    const meditationData = props.meditationId // audioBookPlaylist[meditationId]
    //const data = props.

    useEffect(() => {
        console.log(props, 'props')
        console.log(props.navigation.getParam('meditationId'), 'propss')

    })

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // exit button that sends you to the main page?
    return(
        meditationId?
         <View style={styles.outerContainer}>

            <Text style={styles.headerText}> Meditation Completed</Text>
            <Text style={styles.titleText}> {meditationId.title}</Text>
            <Text style={styles.authorText}>by {meditationId.author}</Text>
            <View Style={{justifyContent:'center' }}>
                <Image resizeMode='stretch' style={styles.image} source={{uri:imageUrls[getRandomInt(0,imageUrls.length)]}} />
            </View>
            
        </View> : null
    )
}

export default MeditationCompletedScreen;

MeditationCompletedScreen.navigationOptions =(navData) =>{
    const handleNavigation = () => {
        navData.navigation.navigate('Courses')
    }
   
    return ({
        headerLeft:       
    <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
        <Item iconSize={40} title='filter' color='black' iconName='ios-close-circle' onPress={handleNavigation } />
    </HeaderButtons>   ,
    })
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: colors.primary,
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    headerText:{
        marginTop: 10,
        fontSize: 30,
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: colors.base
    },
    titleText: {
        marginTop: 20,
        fontSize: 25,
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: colors.strongPrimary
    },
    authorText: {
        fontSize: 20,
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: colors.secondary
    },
    image: {
        marginTop: 30,
        width:Dimensions.get('window').width * .95,
        height: Dimensions.get('window').height * .4,
        borderWidth:1,
        
        borderColor:colors.base, 
        borderRadius:20,
       
        overflow:'hidden' 
    },

})