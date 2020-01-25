import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../constants/colors'
import PropTypes from 'prop-types'

function IndividualMeditationCard(props){
    return(
        <TouchableOpacity testID={`individualMeditationTouchable${props.title}`} onPress={() => props.goToMeditation(props.item)} style={{ width: '100%' }} >
                <View style={styles.meditationcard}>
                    <View style={styles.cardText}>
                        <Text testID={`orderNumber${props.orderNumber}`} style={{ color: 'white', fontSize: 20, }}>{props.orderNumber}</Text>
                    </View>
                    <Text testID={`title${props.title}`} style={{ fontFamily: 'Helvetica-LightOblique', color: 'white', fontSize: 20 }}>{props.title}</Text>
                    <Text testID={`time${props.title}`}  style={{ color: 'white', fontSize: 20 }}>{props.time}</Text>
                    <View style={{ marginRight: 4 }}>
                        <Ionicons size={40} onPress={() => props.goToMeditation(props.item)} name='ios-headset' title='play' />
                    </View>
                </View>
            </TouchableOpacity>
    )
}

export default IndividualMeditationCard;
IndividualMeditationCard.propTypes = {
    /**Contains all individual meditation data  */
    item: PropTypes.object,
    /**number of individual meditation */
    orderNumber: PropTypes.number,
    /**function to navigate user to individual meditation screen */
    goToMeditation: PropTypes.func,
    /**meditation time in minutes and seconds */
    time : PropTypes.string,
    /** title of the individual meditation */
    title : PropTypes.string,
}


const styles = StyleSheet.create({
    cardText: {
        marginLeft: Dimensions.get('window').width * .02,
        width: Dimensions.get('window').width * .1,//40 ,
        height: '55%',
        borderWidth: 2,
        borderColor: colors.darkStrongPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: Dimensions.get('window').width * .8,
        backgroundColor: colors.primary
    },
    meditationcard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: Dimensions.get('window').width * .2,
        height: Dimensions.get('window').height * .10,
        backgroundColor: 'grey',
        opacity: .7,
        width: Dimensions.get('window').width * .9,
        marginTop: Dimensions.get('window').height * .01,
    },

})