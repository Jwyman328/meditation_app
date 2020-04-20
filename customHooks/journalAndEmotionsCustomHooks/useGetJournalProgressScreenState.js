import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetJournalProgressScreenState(props) {
  const pastMonthData = useSelector((state) => state.Mood.moodPastMonth);
  const pastWeekData = useSelector((state) => state.Mood.moodPastWeek);
  const dateRanges = useSelector((state) => state.Mood.moodDates);
  const [dataChoosenText, setDataChoosenText] = useState("Month");
  const [endDate, setEndDate] = useState(undefined);
  const [monthStart, setMonthStart] = useState(undefined);
  const [weekStart, setWeekStart] = useState(undefined);

  const [dataChoosen, setdataChoosen] = useState(pastMonthData);
  const [displayDateText, setdisplayDateText] = useState(undefined);
  // handle bad mood data request
  const fetchMoodDataError = useSelector(
    (state) => state.Mood.fetchMoodDataError
  );

  const setDateRangeStrings = (type) => {
    let monthStartDateFull = dateRanges[2];
    let weekStartDateFull = dateRanges[1];
    let EndDateFull = dateRanges[0];

    let [monthStartDate, time] = monthStartDateFull.split("T");
    monthStartDate = monthStartDate.split(/-(.+)/)[1];
    let [weekStartDate, timeWeek] = weekStartDateFull.split("T");
    weekStartDate = weekStartDate.split(/-(.+)/)[1];
    let [EndDate, timeEndDate] = EndDateFull.split("T");
    EndDate = EndDate.split(/-(.+)/)[1];
    setEndDate(EndDate);
    setMonthStart(monthStartDate);
    setWeekStart(weekStartDate);
    setdisplayDateText(weekStartDate);
  };

  useEffect(() => {
    if (fetchMoodDataError) {
      //
    } else {
      setDateRangeStrings();
    }
  }, []);

  return {
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
  };
}

export default useGetJournalProgressScreenState;
