import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";
import MainButton from "../../components/MainButton";

import useGetJournalProgressScreenState from "../../customHooks/journalAndEmotionsCustomHooks/useGetJournalProgressScreenState";

function JournalProgressScreen(props) {
  const {
    pastMonthData,
    pastWeekData,
    dateRanges,
    dataChoosenText,
    setDataChoosenText,
    endDate,
    setEndDate,
    monthStart,
    setMonthStart,
    weekStart,
    setWeekStart,
    dataChoosen,
    setdataChoosen,
    displayDateText,
    setdisplayDateText,
    fetchMoodDataError,
  } = useGetJournalProgressScreenState();

  const goToWeekly = () => {
    setDataChoosenText("Week");
    setdataChoosen(pastWeekData);
    setdisplayDateText(weekStart);
  };
  const goToMonthly = () => {
    setDataChoosenText("Month");
    setdataChoosen(pastMonthData);
    setdisplayDateText(monthStart);
  };

  const addJournal = () => {
    props.navigation.navigate("JournalScreen");
  };

  return (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwHylvtxiVQMIhcXAJ1bWA0ImbomOGDsfeTNAFN6CViRxna7Q&s",
        }}
      >
        {fetchMoodDataError ? (
          <View style={styles.errorButton}>
            <Text>error: no mood data</Text>
            <Button color="red" title="Add Journal" onPress={addJournal} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>
                  {dataChoosenText} Mood Trends
                </Text>
              </View>

              {displayDateText ? (
                <Text style={styles.dateText}>
                  {" "}
                  {displayDateText} to {endDate}{" "}
                </Text>
              ) : null}
            </View>
            {pastMonthData ? (
              <LineChart
                data={{
                  //labels: ['sad','nuetra','fd','fine','happy'],
                  datasets: [
                    {
                      data: dataChoosen,
                    },
                  ],
                }}
                fromZero={true}
                xLabelsOffset={30}
                width={Dimensions.get("window").width * 0.89} // from react-native
                height={200}
                //formatYLabel={() => ['one', 'two', 'three']}
                chartConfig={{
                  backgroundGradientFromOpacity: 0.7,
                  backgroundGradientToOpacity: 0.9,
                  backgroundColor: colors.base,
                  backgroundGradientFrom: colors.secondary,
                  backgroundGradientTo: colors.base,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 0.7) => colors.darkStrongPrimary, //`rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 0.7) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "5", // was 6
                    strokeWidth: "2",
                    stroke: colors.strongPrimary,
                  },
                }}
                //bezier
                style={{
                  //marginVertical: 30, // height positioning
                  marginHorizontal: Dimensions.get("window").width * 0.05, // width positioning
                  borderRadius: 20,
                }}
              />
            ) : null}
            <View style={styles.buttonContainer}>
              <MainButton
                style={
                  dataChoosenText === "Month"
                    ? styles.buttonNotSelectedContainer
                    : styles.buttonSelectedContainer
                }
                title="Last Week"
                onPress={goToWeekly}
              />
              <MainButton
                style={
                  dataChoosenText === "Week"
                    ? styles.buttonNotSelectedContainer
                    : styles.buttonSelectedContainer
                }
                title="Last Month"
                onPress={goToMonthly}
              />
            </View>
            <View style={styles.buttonAddJournalContainer}>
              <MainButton
                style={styles.AddJournalButton}
                color="blue"
                title="Add Journal"
                onPress={addJournal}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default JournalProgressScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "contain",
  },
  errorButton: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.5,
    borderColor: "black",
    borderWidth: 2,
    marginLeft: Dimensions.get("window").width * 0.25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.005,
    //borderWidth: 2,
    width: Dimensions.get("window").width * 0.8,
  },
  buttonSelectedContainer: {
    height: Dimensions.get("window").height * 0.076,
    width: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 0,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    //marginTop: Dimensions.get('window').height * .05,
    backgroundColor: colors.lightSecondary,
  },
  buttonNotSelectedContainer: {
    height: Dimensions.get("window").height * 0.076,
    width: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 0,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    //marginTop: Dimensions.get('window').height * .05,
    backgroundColor: colors.base,
  },
  graphDataButton: {
    height: Dimensions.get("window").height * 0.076,
    width: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 0,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    //marginTop: Dimensions.get('window').height * .05,
    backgroundColor: colors.lightSecondary,
  },
  buttonAddJournalContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.8,
    //borderWidth: 2,
    marginLeft: Dimensions.get("window").width * 0.1,
    marginRight: Dimensions.get("window").width * 0.1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.03,
  },
  AddJournalButton: {
    height: Dimensions.get("window").height * 0.15,
    width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 0,
    borderRadius: (Dimensions.get("window").height * 0.1) / 2,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    //marginTop: Dimensions.get('window').height * .05,
    backgroundColor: colors.secondary,
  },
  titleText: {
    fontSize: 25,
    fontFamily: "Helvetica-Oblique",
    color: "white",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 21,
    fontFamily: "Helvetica-Oblique",
    color: "white",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height * 0.02,
  },
});
