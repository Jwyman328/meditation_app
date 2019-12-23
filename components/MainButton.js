import React from 'react'

import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from 'react-native'
import colors from '../constants/colors'
function MainButton(props){
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={{...styles.text}}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    button:{
        height:Dimensions.get('window').height * .076, 
        width: Dimensions.get('window').width * .6,
        justifyContent:'center',
        alignItems:'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: 20,
        shadowColor:'black',
        shadowOffset: {width: 5, height: 10 },
        shadowOpacity: .75,
        shadowRadius: 2,

        //marginTop: Dimensions.get('window').height * .05,
        backgroundColor:colors.primary,
    },
    text:{
        fontSize:18,
        fontFamily:'AppleSDGothicNeo-Bold'
    }
})