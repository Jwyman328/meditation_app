import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button } from 'react-native';


import UpdateFeelings from '../store/actions/UpdateFeeling'
import changeLocalMyFeelings from '../store/actions/changeLocalMyFeelings'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons'
import FetchMyFeelings from '../store/actions/FetchMyFeelings'


/**
 * Landing screen after the user logs in.
 * 
 * As well necessarypost login actions like fetching meditations will take place
 */
function MyFeelingsScreen() {

   
 
    const dispatch = useDispatch()
    
    const username = useSelector((state) => state.meditations.username)
    const token = useSelector((state) => state.meditations.token)
    const myFeelings = useSelector((state) => state.meditations.myFeelings)
    


    useEffect(() => {
    }, [])

    const handleColor = (num, feeling) => {
        console.log(num)
        if (num <= myFeelings[feeling]) {
            return 'pink'
        }
        else {
            return 'black'
        }
    }

    const handleChange = (feeling, num) => {
        dispatch(changeLocalMyFeelings(feeling, num))
    }

    const handleNewValues = () => {
        dispatch(UpdateFeelings( myFeelings, token))
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={styles.title}> My feelings</Text>

           {myFeelings? <View style={styles.feelingsCard}>

                <View style={styles.feelingsRow}>
                    <Text>Depressed</Text>
                    <Ionicons size={40} onPress={()=>handleChange('depressed',1)} color={handleColor(1, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('depressed',2)} color={handleColor(2, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('depressed',3)} color={handleColor(3, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('depressed',4)} color={handleColor(4, 'depressed')} name='ios-star-outline' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('depressed',5)} color={handleColor(5, 'depressed')} name='ios-star-outline' title='play' />
                </View>
                <View style={styles.feelingsRow}>
                    <Text>Anxious</Text>
                    <Ionicons size={40} onPress={()=>handleChange('anxious',1)} color={handleColor(1, 'anxious')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('anxious',2)} color={handleColor(2, 'anxious')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('anxious',3)} color={handleColor(3, 'anxious')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('anxious',4)} color={handleColor(4, 'anxious')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('anxious',5)} color={handleColor(5, 'anxious')} name='ios-flower' title='play' />

                </View>
                <View style={styles.feelingsRow}>
                    <Text>Lost</Text>
                    <Ionicons size={40} onPress={()=>handleChange('lost',1)} color={handleColor(1, 'lost')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('lost',2)} color={handleColor(2, 'lost')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('lost',3)} color={handleColor(3, 'lost')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('lost',4)} color={handleColor(4, 'lost')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('lost',5)} color={handleColor(5, 'lost')} name='ios-flower' title='play' />

                </View>
                <View style={styles.feelingsRow}>
                    <Text>Stressed</Text>
                    <Ionicons size={40} onPress={()=>handleChange('stressed',1)} color={handleColor(1, 'stressed')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('stressed',2)} color={handleColor(2, 'stressed')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('stressed',3)} color={handleColor(3, 'stressed')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('stressed',4)} color={handleColor(4, 'stressed')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('stressed',5)} color={handleColor(5, 'stressed')} name='ios-flower' title='play' />

                </View>
                <View style={styles.feelingsRow}>
                    <Text>Excited</Text>
                    <Ionicons size={40} onPress={()=>handleChange('excited',1)} color={handleColor(1, 'excited')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('excited',2)} color={handleColor(2, 'excited')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('excited',3)} color={handleColor(3, 'excited')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('excited',4)} color={handleColor(4, 'excited')} name='ios-flower' title='play' />
                    <Ionicons size={40} onPress={()=>handleChange('excited',5)} color={handleColor(5, 'excited')} name='ios-flower' title='play' />

                </View>
            </View>   
            
            :null}
            <Button title='submit' onPress = {handleNewValues} />

        </View>
    )
}

export default MyFeelingsScreen;

const styles = StyleSheet.create({
    feelingsCard: {
        width: Dimensions.get('window').width * .95,
        height: Dimensions.get('window').height * .6,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        marginTop: 25,

    },
    feelingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title:{
        marginTop:20,
        fontSize: 50,
    }

})