import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../store/actions/setUserHealthData'
import MyScrollPicker from './components/scrollPicker'
import ContinueButton from './components/continueButton'

function ChooseDOB(props) {
    const healthData = useSelector((state) => state.ProfileData.userHealthData)
    const firstTime = props.navigation.getParam('firstTime')

    const [month, setmonth] = useState([])
    const [year, setyeares] = useState([])

    const [monthChoosen, setmonthChoosen] = firstTime? useState(6) : useState(healthData.DOB.month)
    const [yearChoosen, setyearChoosen] = firstTime? useState(6) : useState(healthData.DOB.year)
    const dispatch = useDispatch()

    // token healthData and firstTime required to make api request ot change data
    const token = useSelector((state) => state.AuthData.token)

     
    const goToChooseDOB = () => {
        healthData.DOB = {month:monthChoosen, year:yearChoosen}

        firstTime?   dispatch(SetUserHealthData('DOB',{month:monthChoosen, year:yearChoosen}))
        : dispatch(SetUserHealthData('DOB',{month:monthChoosen, year:yearChoosen},true, healthData, token))    

        firstTime? props.navigation.navigate('Feelings',{firstTime:true}): props.navigation.navigate('ProfileDataScreen')
    }
    useEffect(() => {
        let monthSet = [];
        let yearSet = []

        for (let i = 1; i <= 17; i++) {
            monthSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
        }
        for (let i = 1935; i <= 2030; i++) {
            yearSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
        }
        setmonth(monthSet)
        setyeares(yearSet)
    }, [])

    const monthValueChange= (selectedValue) => {
        return selectedValue + 1
    }

    const yearValueChange = (selectedValue) => {
        return selectedValue + 1935
    }


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
                    <MyScrollPicker valueChange={(selectedValue) => selectedValue + 1} selectedIndex={() => monthChoosen -1} dataSource={month} setValue={setmonthChoosen}  />
                    <MyScrollPicker valueChange={(selectedValue) => selectedValue + 1935} selectedIndex={() => yearChoosen -1935} dataSource={year} setValue={setyearChoosen}  />
                </View> : null}
            <ContinueButton goToScreen={goToChooseDOB} textValue={'Continue'} />
        </View>
    )
}

export default ChooseDOB;

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
