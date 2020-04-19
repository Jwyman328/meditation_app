import React from "react";
import { Keyboard } from "react-native";

function removeKeyboardFromScreen(setKeyboardVisible) {
  Keyboard.dismiss();
  setKeyboardVisible(false);
}

export default removeKeyboardFromScreen;
