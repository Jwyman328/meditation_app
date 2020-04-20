import React, { useState, useEffect } from "react";

function useGetJournalScreenState() {
  const today = new Date();
  const [date, setDate] = useState(today.toLocaleDateString());
  const [happynessValue, sethappynessValue] = useState(3);
  let [faceEmotion, setFaceEmotion] = useState("neutral");
  const [face, setFace] = useState("emoticon-neutral");
  const faceEmotions = ["Terrible", "Bad", "Neutral", "Good", "Excellent"];
  const faces = [
    "emoticon-dead",
    "emoticon-sad",
    "emoticon-neutral",
    "emoticon-happy",
    "emoticon-excited",
  ];

  /**
   * Set value of the emotion text and icon face when user selects emotion with slider.
   */
  const returnFace = () => {
    setFaceEmotion(faceEmotions[happynessValue - 1]);
    const face = faces[happynessValue - 1];
    setFace(face);
  };

  /**
   * Adjust emotion face icon and emotion text when emotion slider value changed.
   */
  useEffect(() => {
    returnFace();
  }, [happynessValue]);

  return {
    date,
    setDate,
    happynessValue,
    sethappynessValue,
    faceEmotion,
    setFaceEmotion,
    face,
    setFace,
    faceEmotions,
    faces,
  };
}

export default useGetJournalScreenState;
