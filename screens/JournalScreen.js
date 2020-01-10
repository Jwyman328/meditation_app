import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View , Dimensions} from 'react-native';
import { Slider } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'



function JournalScreen() {
    const [happynessValue, sethappynessValue] = useState(3)
    let [faceEmotion, setFaceEmotion] = useState('neutral')
    const [face, setFace] = useState('emoticon-neutral')

    const returnFace = () => {
        const faceEmotions = ['terrible', 'bad', 'neutral', 'good', 'excellent']
        const faces = ['emoticon-dead','emoticon-sad', 'emoticon-neutral', 'emoticon-happy','emoticon-excited']

        setFaceEmotion(faceEmotions[happynessValue-1])
        const face = faces[happynessValue-1]
        setFace(face)
        console.log(face)

    }

    useEffect(() => {
        console.log('changes')
        returnFace()
    },[happynessValue])

    return (
        <View>
            <Text>Journal Page</Text>
            < View style={styles.container} >
            </View >
            <View>
                <Text>{faceEmotion} </Text>
                <MaterialCommunityIcons size={70} name={face} title='play' />
            </View>


            <Slider
                style={{ width: 200, height: 40, marginTop:100 }}
                minimumValue={1}
                maximumValue={5}
                step={1}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="red"
                value={happynessValue}
                onValueChange={(sliderValue) => sethappynessValue(sliderValue)}

            />
        </View>
    )
}

export default JournalScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
    }
})