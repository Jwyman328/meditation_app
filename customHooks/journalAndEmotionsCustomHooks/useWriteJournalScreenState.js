import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useWriteJournalScreenState(navigation) {
  const today = new Date();
  const [value, setValue] = useState("");
  const [date, setDate] = useState(today.toLocaleDateString());
  const myCurrentEmotion = navigation.getParam("faceEmotion");
  const myCurrentFaceEmotion = navigation.getParam("face");
  const happynessValue = navigation.getParam("happynessValue");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const token = useSelector((state) => state.AuthData.token);

    /**
   * Handle user typing input.
   * @param {string} text value entered into textinput
   */
  const handleChange = (text) => {
    setValue(text);
  };

  return {
    value,
    setValue,
    date, setDate,
    myCurrentEmotion,
    myCurrentFaceEmotion,
    happynessValue,
    keyboardVisible,
    setKeyboardVisible,
    token,
    handleChange,
  };
}

export default useWriteJournalScreenState;
