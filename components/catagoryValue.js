import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors'


function CatagoryValue(props) {
    return (
        <TouchableOpacity onPress={props.changeNavigation} >
            <View style={styles.dataContainer}>
                <Text testID={`label${props.label}`} style={styles.textData}>{props.label}</Text>
                <Text testID={`value${props.value}`} style={styles.textData}>{props.value}</Text>
                <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />
            </View>
        </TouchableOpacity>
    )

}

export default CatagoryValue;

CatagoryValue.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    changeNavigation: PropTypes.oneOfType([PropTypes.func, PropTypes.any]) //can be null

  };


  const styles = StyleSheet.create({
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .05,
    },
    textData: {
        fontSize: 20,
        fontFamily: 'Helvetica-LightOblique',
        textAlign: 'justify',
        width: Dimensions.get('window').width * .45,
    },
    TitleText: {
        fontSize: 30,
        fontFamily: 'Helvetica-LightOblique',

    },
    titleContainer: {
        marginVertical: Dimensions.get('window').height * .03,
    },
    logoutButtonContainer: {
        marginTop: Dimensions.get('window').height * .05
    }

})