import React, { useState, useEffect } from 'react'
import {ScrollView, StyleSheet, Text, View, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import { Slider } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/colors';
import InputScrollView from 'react-native-input-scroll-view';
import { useDispatch, useSelector } from 'react-redux'

import CreateJournal from '../../store/actions/createJournal'



function WriteJournalScreen() {
    const today = new Date()
    const [date, setDate] = useState(today.toLocaleDateString())
    const [happynessValue, sethappynessValue] = useState(3)
    let [faceEmotion, setFaceEmotion] = useState('neutral')
    const [face, setFace] = useState('emoticon-neutral')
    const faceEmotions = ['terrible', 'bad', 'neutral', 'good', 'excellent']
    const faces = ['emoticon-dead', 'emoticon-sad', 'emoticon-neutral', 'emoticon-happy', 'emoticon-excited']

    const [value, setValue] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false)

    const dispatch = useDispatch()
    const token = useSelector((state) => state.AuthData.token)


    const returnFace = () => {
        setFaceEmotion(faceEmotions[happynessValue - 1])
        const face = faces[happynessValue - 1]
        setFace(face)
    }

    useEffect(() => {
        returnFace()
    }, [happynessValue])

    const handleKeyboard = () => {
        console.log('kyboard t')
        setKeyboardVisible(true)
    }

    const removeKeyboard = () => {
        Keyboard.dismiss()
        setKeyboardVisible(false)
        console.log('kyboard f')

    }

    const handleChange = (text) => {
        setValue(text)
    }

    const handleCreateJournal = () => {
        //date, text, mood, token
        dispatch(CreateJournal(date,value,2,token ))
    }

    const DateChoosen = () => {

    }

    return (
        <View style={styles.outerContainer}>
           <TouchableWithoutFeedback onPress={removeKeyboard}>
                 <View style={styles.msgContainer}>
                    <Text>{date}</Text>

                    <View style={{flexDirection:'row'}} >
                        <Text>I'm feeling {faceEmotion} </Text>
                        <MaterialCommunityIcons size={30} color={colors.lightSecondary} name={face} title='play' />
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <ScrollView>
            <TouchableOpacity onPress={handleKeyboard}>
                <View style={styles.JournalCard }>
                    <InputScrollView>
                        <TextInput
                            onFocus={handleKeyboard}
                            multiline={true}
                            style={ styles.TextInput}
                            value={value} onChangeText={text => handleChange(text)} />
                    </InputScrollView>
                </View>
            </TouchableOpacity>

            <View >
                    <Button title='submit' onPress={handleCreateJournal} />
                </View>
                </ScrollView>

        </View>
    )
}

export default WriteJournalScreen;

const styles = StyleSheet.create({
    buttonContainer:{

        height: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width * .95,
    },
    JournalCard:{
        height: Dimensions.get('window').height * .33,
        width: Dimensions.get('window').width * .95,
        flexDirection: 'column', 
        justifyContent: 'flex-start',
         alignItems: 'flex-start'
    },
    outerContainer: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
    },
    container: {
        marginTop: 100,
    },
    TextInput: {
        height: Dimensions.get('window').height * .32,
        width: Dimensions.get('window').width * .95,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 18,
        paddingTop: Dimensions.get('window').height * .005

    },
    JournalEntryTextBox:{
        height: Dimensions.get('window').height * .25,
    },
    msgContainer: {
        height: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width * .8,
        marginTop: Dimensions.get('window').height * .01,
        justifyContent:'center',
        alignItems:'center',
        borderColor: 'gray',
        borderWidth: 1,
    },
    msgContainerModified: {
        justifyContent:'center',
        alignItems:'center',
        marginTop: Dimensions.get('window').height * .1,
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width,
        borderColor: 'gray',
        borderWidth: 1,
    },
})