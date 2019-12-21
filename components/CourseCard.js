import React from 'react'
import PropTypes from 'prop-types';


import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import { FlatList } from 'react-native-gesture-handler'

function CourseCard(props) {
    return (
        <TouchableOpacity onPress={() => props.goToCourse(props.id, props.uri)}>
            <View style={styles.outerContainer}>
                <ImageBackground imageStyle={{ borderRadius: 20 }} style={styles.backgroundImage} source={{ uri: props.uri }}>
                    <View style={styles.courseCard}>
                        <View style={styles.titleContainer} >
                            <Text>{props.title}</Text>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        </TouchableOpacity>

    )
}

export default CourseCard;

const styles = StyleSheet.create({
    courseCard: {
        borderWidth: 0,
        borderColor: null,
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .4,
        width: Dimensions.get('window').width * .45,
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
    },
    outerContainer: {
        height: Dimensions.get('window').height * .4,
        width: Dimensions.get('window').width * .45,
        alignItems: 'center',
        marginHorizontal: 3.5,

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        backgroundColor: 'grey',
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
    }
})


CourseCard.propTypes = {
    goToCourse : PropTypes.func,
    title : PropTypes.string,
    uri: PropTypes.string ,
    catagories: PropTypes.array,
    audioIds: PropTypes.array,
    courseId: PropTypes.string,
}
