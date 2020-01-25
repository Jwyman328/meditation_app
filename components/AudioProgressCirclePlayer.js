import React, { useState, useEffect } from 'react';

import { Text, Button, View } from 'react-native'

import ProgressCircle from 'react-native-progress-circle'
import PropTypes from 'prop-types'
import colors from '../constants/colors';

/**
 * Display a audio progress circle that shows percent complete and current time of audio.
 * @var {number} percent a number 0-100 representing the % of audio that has been played
 */
function AudioProgressCircle(props) {
  const [percent, setPercent] = useState(0)


  /**
   * When the audio is playing increase the playTime by one second every second.
   * 
   * as well as increasing the playtime, use it to change the displayTime 
   * and percent of song that has been played.
   */
  useEffect(() => {
    if (props.playTime === props.songTime){
      props.goToMeditationCompleted({meditationId: props.meditationId})
    }else{
      //
    }
    if (props.isPlaying) {
      const interval = setInterval(() => {
        const newPlayTime = props.playTime + 1;
        props.songTimeChanger(newPlayTime)
        // handle minutes if the newPlayTime seconds is more than 60
        if (newPlayTime >= 60) {
          var minutes = Math.floor(newPlayTime / 60)
          var seconds = newPlayTime - minutes * 60
          minutes = Math.floor(minutes)
          let minutesCheck10 = minutes < 10 ? `0${minutes}` : minutes
          let secondsCheck10 = seconds < 10 ? `0${seconds}` : seconds
          const realPercent = newPlayTime / props.songTime * 100
          setPercent(realPercent)
          props.displayTimeChange(`${minutesCheck10}:${secondsCheck10}`)
        } else {
          // if you hacent reached a minue yet just display the seconds
          const realPercent = newPlayTime / props.songTime * 100
          let secondsCheck10 = newPlayTime < 10 ? `0${newPlayTime}` : newPlayTime
          setPercent(realPercent)
          props.displayTimeChange(`00:${secondsCheck10}`)
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      if (props.playTime === props.songTime){
        props.goToMeditationCompleted()
      }else{
        //
      }
      console.log('stopped playing')
    }
  }, [props.playTime]);

  return (
    <View style={{opacity: .8}}>
    <ProgressCircle
      testID='progressCircle'
      percent={percent}
      radius={90}
      borderWidth={8}
      color={'#748AD6'}
      shadowColor={colors.base}
      bgColor={colors.primary}
      
    >
      {props.children}
      <Text testID='displayTime' style={{color:colors.strongPrimary, fontSize: 23, fontFamily: 'Helvetica-LightOblique' }}>{props.displayTime}</Text>
    </ProgressCircle>
    </View>
  )
}

export default AudioProgressCircle;

AudioProgressCircle.propTypes = {
  playTime: PropTypes.number, // current amount of time played in seconds
  songTime: PropTypes.number, // total seconds of song
  isPlaying: PropTypes.bool, // if the audio is playing
  songTimeChanger: PropTypes.func, //changes the state of playTime
  displayTime: PropTypes.string, // the display time 
  displayTimeChange: PropTypes.func, // set the state of displayTime
} 
