import React from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'


function IntroToQuestionsScreen(props) {
    const goToChooseGender = () => {
        props.navigation.navigate('chooseGender',{firstTime:true})
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textIntro}>To better understand your health needs, please tell us a few things about yourself. </Text>
            </View>
            <TouchableOpacity onPress={goToChooseGender} >
                <View style={styles.buttonContainer}>
                    <View style={styles.text}>
                        <Text style={{color: 'black', opacity:1, fontSize:25}}> Start </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default IntroToQuestionsScreen;

const styles = StyleSheet.create({
    text:{
        opacity:1,

    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: colors.lightSecondary,
        alignItems: 'center',

    },
    textContainer: {
        marginTop: Dimensions.get('window').height * .23,
        width: Dimensions.get('window').width * .83,
        //height: Dimensions.get('window').height,
    },
    textIntro: {
        fontSize: 24,
        fontFamily: 'Helvetica-Oblique',
        textAlign: 'center'
    },
    buttonContainer: {
        justifyContent:'center',
        alignItems:'center',
        marginTop: Dimensions.get('window').height * .23,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .1,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 0,
        backgroundColor: 'white',
        opacity: .3,
    },
})