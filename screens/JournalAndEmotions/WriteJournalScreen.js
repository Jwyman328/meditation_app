import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, KeyboardAvoidingView, View, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { Slider } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'                             

import CreateJournal from '../../store/actions/createJournal'
/**
 * Allow user to write a Journal entry for the date selected.
 */
function WriteJournalScreen(props) {
    const today = new Date()
    const [value, setValue] = useState('')
    const [date, setDate] = useState(today.toLocaleDateString())
    const myCurrentEmotion  = props.navigation.getParam('faceEmotion')
    const myCurrentFaceEmotion  = props.navigation.getParam('face')
    const happynessValue  = props.navigation.getParam('happynessValue')
    const [keyboardVisible, setKeyboardVisible] = useState(false)

    const dispatch = useDispatch()
    const token = useSelector((state) => state.AuthData.token)

    const handleKeyboard = () => {
        console.log('kyboard t')
        setKeyboardVisible(true)
    }

    const removeKeyboard = () => {
        Keyboard.dismiss()
        setKeyboardVisible(false)
        console.log('kyboard f')
    }

    /**
     * Handle user typing input.
     * @param {string} text value entered into textinput
     */
    const handleChange = (text) => {
        setValue(text)
    }

    /**
     * Post journal entry on submision, reset textinput to empty string,
     * Then navigate back to JournalHomeScreen.
     */
    const handleCreateJournal = () => {
        //date, text, mood, token
        dispatch(CreateJournal(date, value, happynessValue, token))
        props.navigation.navigate('JournalProgressScreen')
    }

    return (
        <ImageBackground style={styles.backgroundImage}
        source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwsHBgcIBw0RBwcIByAHBwcHDQ8IFQcWFxEXFiAdHx8iKC8uJCY0Hx8VLTktJzEzOjUuIyJLODMyTjIyLjIBCgoKDQ0NFw0NDysZFiU3KzgzKzc3LSs3ODc4ODcrLisrKystListKy0rKys3NystLCsrKzctKysrKys3LSsrK//AABEIAToAoAMBEQACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQQCAwX/xAAfEAEBAAEFAQADAAAAAAAAAAAAEQECAwQFdCUSEzH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQMCBv/EACARAQEAAgICAgMAAAAAAAAAAAARAQIDMwQyEjEhIiP/2gAMAwEAAhEDEQA/APgx7h0QCAQCAQCAQCAQCAQCAQCAQCAQCAQFiOaQKQKQKQKQKQKQKQKQKQKQKQKQKQKQKQKQKQKQK6iVzSFKQpSFKQpSFKQpSFKQpSFKQpSFKQpSFKQpSFKQpSFKQpSFWukcgAAAAAAAAAAAAAAAAAAOojggEAgEAgEAgEAgEAgEAgEAgEAgEAgOoiUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgV1Ec0gUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgV1Ec0gUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgV1Ec0gUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgVYiEAgEAgEAgEAgEAgEAgEAgEAgEAgEB1EckAgEAgEAgEAgEAgEAgEAgEAgEAgEB1Ec0gUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgUgVq6vj6eV2PE2N2/r3d/GjX+OZcM+bfOvHnbH2uv5zjDPHbggEAgEAgEAgEAgEAgEAgEAgEAgEBv6HH2ev8AThj5HVs74/bDFGrIgEAgEAgEAgEAgEAgEAgEAgEAgEBv6HH2eB6cMfI6tnfH74Yo1ZEAgEAgEAgEAgEAgEAgEAgEAgEAgN3RY+xwPThj5HVs04vfDHGrGkCkCkCkCkCkCkCkCkCkCkCkCkCkCkCkCkCkCt3R4+xwPThj5HVs04s/vhjjViQCAQCAQCAQCAQCAQCAQCAQCAQCA3dHj7HA9GGPkdWzTi98McasSAQCAQCAQCAQCAQCAQCAQCAQCCkBu6PH1+D6MMefr2acPZhjjVjSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBW3pMfX4Powx5+vZpw5/phkjVjSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBSBXv1+/ji87jb+vH5aNrexr1Y0/wBzhxya/LTOuHfHv8dsbZeMdMiAQCAQCAQCAQCAQCAQCAQCAQCAQCA6iIQCAQCAQCAQCAQCAQCAQCAQCAQCAQFEAAAAAAAAAAAAAAAAAAAVAAAAAAAAAAAAAAAAAAABRAAAAAAAAAAAABAAAAAABRAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAABUoFAoFAoFAoFAoFAoFAoFAoFAoFAoFHTlyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAOoBAIBAIBAIBAIBAIBAIgQCAQCAQCAQFEAAAAAAAAAAAAAAAAAAAVEAAAAAAAAAAAAAAAAAAAWAQCAAICgAAAABAAAIBAIBAIBAVEAAAAAAAAAAAAAAAAAAAVEAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAABXLkAAAAAAAAAAAAAAAAAABRAAAAAAAAAAAAAAAAAAAH/9k='}} >
            <View style={styles.outerContainer}>
                <TouchableWithoutFeedback onPress={removeKeyboard}>
                    <View style={styles.msgContainer}>
                        <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'space-between' }} >
                            <View style={{ marginRight: 20 }}>
                                <Text style={styles.title} testID='title' >I'm feeling {myCurrentEmotion}</Text>
                            </View>
                            <MaterialCommunityIcons testID="emotionFace" size={40} color={colors.lightSecondary} name={myCurrentFaceEmotion} title='play' />
                        </View>
                        <Text style={styles.dateText} testID='date'>{date}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={handleKeyboard}>
                        <View style={styles.JournalCard}>
                            <View>
                                <TextInput
                                placeholder="I'm feeling?"
                                    testID='textInput'
                                    onFocus={handleKeyboard}
                                    multiline={true}
                                    style={styles.TextInput2}
                                    value={value}
                                    onChangeText={text => handleChange(text)} />
                            </View>
                            <View style={styles.sendContainer}>
                                <TouchableOpacity testID='submitButton' title='submit' onPress={handleCreateJournal}>
                                    <Ionicons size={45} name='ios-arrow-dropup-circle' color={'blue'} title='play' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            </ImageBackground>
    )
}

export default WriteJournalScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontFamily: 'Helvetica-Oblique'
    },
    dateText: {
        fontSize: 20,
        fontFamily: 'Helvetica-Oblique'

    },
    screenContainer: {
        maxHeight: Dimensions.get('window').height * 1,
        minHeight: Dimensions.get('window').height * .8,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        //borderWidth:3,
        //borderColor: 'yellow'
    },
    buttonContainer: {
        height: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width * .95,
    },
    JournalCard: {
        height: Dimensions.get('window').height * .3,
        width: Dimensions.get('window').width * .83,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //borderColor: 'green',
        //borderWidth: .5,

    },
    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        //borderColor: 'yellow',
        //borderWidth: 2,
    },
    TextInput2: {
        height: Dimensions.get('window').height * .27,
        width: Dimensions.get('window').width * .83,

        textAlign: 'left',
        textAlignVertical: 'top',
        paddingTop: 20,
        paddingBottom: 0,
        fontSize: 18,
        paddingTop: Dimensions.get('window').height * .005,
        paddingLeft:7,
        //borderColor: 'pink',
        //borderWidth: 2,

    },
    JournalEntryTextBox: {
        height: Dimensions.get('window').height * .25,
        borderColor: 'red',
        //borderWidth: 2,
    },
    msgContainer: {
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .95,
        //marginTop: Dimensions.get('window').height * .01,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'orange',
        //borderWidth: 1,

    },
    sendContainer:{
        //borderWidth:2,
        borderColor:"green",
        width: Dimensions.get('window').width * .15,
        minHeight: Dimensions.get('window').height * .05,
        maxHeight: Dimensions.get('window').height * .3,
        //marginLeft:2,
        marginRight:20,
        paddingRight:10,
        justifyContent:'flex-end',
        alignItems:'center',
        borderColor: 'orange',
        //borderWidth: 1,
    },
    inputContainer : {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        height: Dimensions.get('window').height * .3,
        //flex:1,
        width:Dimensions.get('window').width * .98,
        borderColor: 'black',
        borderWidth:1,
        marginBottom:20,
        borderRadius:20,
        backgroundColor:'white',
        shadowColor:'black',
        shadowOpacity: .8,
        shadowOffset: {  width: 10,  height: 10,  },
   },
   backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
},
})