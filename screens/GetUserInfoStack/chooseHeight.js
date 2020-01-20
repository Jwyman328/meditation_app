import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../store/actions/setUserHealthData'




function ChooseHeight(props) {

    const firstTime = props.navigation.getParam('firstTime')
    const dispatch = useDispatch()

    // token healthData and firstTime required to make api request ot change data
    const token = useSelector((state) => state.AuthData.token)
    const healthData = useSelector((state) => state.ProfileData.userHealthData)

    const [feet, setFeet] = useState([])
    const [inch, setInches] = useState([])
    const [feetChoosen, setfeetChoosen] = firstTime? useState(5) :useState(healthData.height.feet)
    const [inchChoosen, setinchChoosen] = firstTime?  useState(5) : useState(healthData.height.inch)


    const goToChooseDOB = () => {
        healthData.height = {feet:feetChoosen, inch:inchChoosen}

        firstTime?   dispatch(SetUserHealthData('height',{feet:feetChoosen, inch:inchChoosen}))
            : dispatch(SetUserHealthData('height',{feet:feetChoosen, inch:inchChoosen},true, healthData, token))

        //dispatch(SetUserHealthData('height',{feet:feetChoosen, inch:inchChoosen}))
        firstTime? props.navigation.navigate('ChooseDOB',{firstTime:true}) : props.navigation.navigate('ProfileDataScreen')
    }
    useEffect(() => {
        let feetSet = [];
        let inchSet = []

        for (let i = 1; i <= 13; i++) {
            feetSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
            inchSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
        }
        setFeet(feetSet)
        setInches(inchSet)
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textIntro}>Your height</Text>
            </View>
            <View style={{ marginBottom: 10, width:200, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.textIntro}>Feet</Text>
                <Text style={styles.textIntro}>Inches</Text>

            </View>
            {feet ?
                <View style={{ width:200, flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center' }}>
                    <View style={styles.pickerContainer}>
                        <ScrollPicker
                            dataSource={
                                feet
                            }
                            selectedIndex={feetChoosen -1}
                            renderItem={(data, index, isSelected) => {
                                //
                            }}
                            onValueChange={(data, selectedIndex) => {
                                //
                                setfeetChoosen(selectedIndex + 1)
                            }}

                            wrapperHeight={250}
                            wrapperWidth={70}
                            wrapperBackground={'white'}
                            itemHeight={70}
                            highlightColor={colors.base}
                            highlightBorderWidth={5}
                            activeItemColor={'#222121'}
                            itemColor={colors.strongPrimary}
                        /></View>

                    <View style={styles.pickerContainer}>

                        <ScrollPicker
                            dataSource={
                                inch
                            }
                            selectedIndex={inchChoosen - 1}
                            renderItem={(data, index, isSelected) => {
                                //
                            }}
                            onValueChange={(data, selectedIndex) => {
                                //
                                
                                setinchChoosen(selectedIndex + 1)
                            }}

                            wrapperHeight={250}
                            wrapperWidth={70}
                            wrapperBackground={'white'}
                            itemHeight={70}
                            highlightColor={colors.base}
                            highlightBorderWidth={5}
                            activeItemColor={'#222121'}
                            itemColor={colors.strongPrimary}
                        /></View>




                </View> : null}

            <TouchableOpacity onPress={goToChooseDOB} >
                <View style={styles.buttonContainer}>
                    <View style={styles.text}>
                        <Text style={{ color: 'black', opacity: 1, fontSize: 25 }}> Continue </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChooseHeight;

const styles = StyleSheet.create({
    pickerContainer: {
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * .6,
    },
    text: {
        opacity: 1,

    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: colors.lightSecondary,
        alignItems: 'center',

    },
    textContainer: {
        marginTop: Dimensions.get('window').height * .03,
        width: Dimensions.get('window').width * .83,
        //height: Dimensions.get('window').height,
        marginBottom: Dimensions.get('window').height * .05
    },
    textIntro: {
        fontSize: 24,
        fontFamily: 'Helvetica-Oblique',
        textAlign: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: Dimensions.get('window').height * .05,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .1,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 0,
        backgroundColor: 'white',
        opacity: .3,
    },
})