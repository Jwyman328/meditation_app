import React from 'react'
import { 
    Keyboard,
  } from "react-native";

const handleKeyboard = (setKeyboardVisible) => {
    setKeyboardVisible(true);
  };

  const removeKeyboard = (setKeyboardVisible) => {
    Keyboard.dismiss();
    setKeyboardVisible(false);
  };

  export  {handleKeyboard,removeKeyboard }