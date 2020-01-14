import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../store/actions/setUserHealthData'



function ChooseHeight(props) {
    const [month, setmonth] = useState([])
    const [year, setyeares] = useState([])


    const [monthChoosen, setmonthChoosen] = useState(150)
    const [yearChoosen, setyearChoosen] = useState(150)
    const firstTime = props.navigation.getParam('firstTime')
    const dispatch = useDispatch()

    // token healthData and firstTime required to make api request ot change data
    const token = useSelector((state) => state.meditations.token)
    const healthData = useSelector((state) => state.meditations.userHealthData)

     
    const goToChooseDOB = () => {
        healthData.DOB = {month:monthChoosen, year:yearChoosen}

        firstTime?   dispatch(SetUserHealthData('DOB',{month:monthChoosen, year:yearChoosen}))
        : dispatch(SetUserHealthData('DOB',{month:monthChoosen, year:yearChoosen},true, healthData, token))    

        firstTime? props.navigation.navigate('Feelings',{firstTime:true}): props.navigation.navigate('ProfileDataScreen')
    }
    useEffect(() => {
        let monthSet = [];
        let yearSet = []

        for (let i = 1; i <= 14; i++) {
            monthSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
        }
        for (let i = 1935; i <= 2020; i++) {
            yearSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
        }

        setmonth(monthSet)
        setyeares(yearSet)
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textIntro}>Your Age</Text>
            </View>
            <View style={{ marginBottom: 10, width:200, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.textIntro}>Month</Text>
                <Text style={styles.textIntro}>Year</Text>

            </View>
            {month ?
                <View style={{ width:200, flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center' }}>
                    <View style={styles.pickerContainer}>
                        <ScrollPicker
                            dataSource={
                                month
                            }
                            selectedIndex={6}
                            renderItem={(data, index, isSelected) => {
                                //
                            }}
                            onValueChange={(data, selectedIndex) => {
                                //
                                setmonthChoosen(selectedIndex + 1)
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
                                year
                            }
                            selectedIndex={55}
                            renderItem={(data, index, isSelected) => {
                                //
                            }}
                            onValueChange={(data, selectedIndex) => {
                                //
                                setyearChoosen(selectedIndex + 1935)
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
