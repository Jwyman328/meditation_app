import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'

function JournalProgressScreen(props) {

    const pastMonthData = useSelector((state) => state.Mood.moodPastMonth)
    const pastWeekData = useSelector((state) => state.Mood.moodPastWeek)
    const dateRanges = useSelector((state) => state.Mood.moodDates)
    const [endDate, setEndDate ]= useState(undefined)
    const [monthStart, setMonthStart] = useState(undefined)
    const [weekStart,setWeekStart] = useState(undefined)

    const [dataChoosen, setdataChoosen] = useState(pastMonthData)
    const [displayDateText, setdisplayDateText] = useState(undefined)

    const goToWeekly = () => {
        setdataChoosen(pastWeekData)
        setdisplayDateText(weekStart)
    }
    const goToMonthly = () => {
        setdataChoosen(pastMonthData)
        setdisplayDateText(monthStart)
    }

    const setDateRangeStrings = (type) => {
        //console.log(dateRanges)
        let monthStartDateFull = dateRanges[2]
        let weekStartDateFull = dateRanges[1]
        let EndDateFull = dateRanges[0]
        
        let [monthStartDate, time] = monthStartDateFull.split('T')
        monthStartDate = monthStartDate.split(/-(.+)/)[1]
        let  [weekStartDate, timeWeek] = weekStartDateFull.split('T')
        weekStartDate = weekStartDate.split(/-(.+)/)[1]
        let [EndDate , timeEndDate] = EndDateFull.split('T')
        EndDate = EndDate.split(/-(.+)/)[1]
        console.log(monthStartDate,weekStartDate, EndDate)
        setEndDate(EndDate)
        setMonthStart(monthStartDate)
        setWeekStart(weekStartDate)
        setdisplayDateText(weekStartDate)

    }
    const addJournal = () => {
        props.navigation.navigate('JournalScreen')
    }
    useEffect(() => {
        setDateRangeStrings()
    },[])
    return (

        <View>
            <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwHylvtxiVQMIhcXAJ1bWA0ImbomOGDsfeTNAFN6CViRxna7Q&s' }}>
                <View>
                    <View style={{marginLeft:100, marginTop:30}}>
                        <Text style={{fontSize:20, color:'white'}}>Mood Trends</Text>
                        {displayDateText?<Text style={{fontSize:20, color:'white'}}> {displayDateText} to {endDate}   </Text>: null}
                    </View>
                    {pastMonthData ? <LineChart
                        data={{
                            labels: ["Month mood trends"],
                            datasets: [
                                {
                                    data: dataChoosen
                                }
                            ]
                        }}
                        fromZero={true}
                        xLabelsOffset={30}
                        width={Dimensions.get("window").width * .89} // from react-native
                        height={200}
                        //formatYLabel={() => ['one', 'two', 'three']}
                        chartConfig={{
                            backgroundGradientFromOpacity: 0.7,
                            backgroundGradientToOpacity: 0.9,
                            backgroundColor: colors.base,
                            backgroundGradientFrom: colors.secondary,
                            backgroundGradientTo: colors.base,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = .7) => colors.darkStrongPrimary, //`rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = .7) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "5", // was 6
                                strokeWidth: "2",
                                stroke: colors.strongPrimary
                            }
                        }}
                        bezier
                        style={{

                            //marginVertical: 30, // height positioning
                            marginHorizontal: Dimensions.get("window").width * .05, // width positioning 
                            borderRadius: 20
                        }}
                    /> : null}
                    <Button title='weekly' onPress={goToWeekly} />
                    <Button title='monthly' onPress={goToMonthly} />
                    <Button title='Add Journal' onPress={addJournal} />
                </View>
            </ImageBackground>
        </View>

    )
}



export default JournalProgressScreen
const styles = StyleSheet.create({

    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },

})