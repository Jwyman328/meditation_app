import React from 'react'


import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import { FlatList } from 'react-native-gesture-handler'

function CourseCard(props) {
    console.log(props.audioIds, 'id?')
    return (
        <TouchableOpacity onPress={() => props.goToCourse(props.title, props.uri, props.catagories, props.audioIds)}>
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
        marginHorizontal: 2,

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