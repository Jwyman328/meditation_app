import React, {useState, useEffect} from 'react';

import {Text, Button} from 'react-native'

import ProgressCircle from 'react-native-progress-circle'
import PropTypes from 'prop-types'
 
function Example (props){
    const [percent, setPercent] = useState(0)
    const [playtime, setPlaytime] = useState(props.playTime)
    const [songTime, setSongTime] = useState(props.songTime)
    const [timeDisplay, setTimeDisplay] = useState(props.displayTime)

    const displayerTime = props.playTime

   
    const changePercent = () => {
      const newPercent = playtime + 1;
      setPlaytime(newPercent);
    }

    

    useEffect(() => {
      //props.songTimeChanger(10)
      if (props.isPlaying){
        const interval = setInterval(() => {
          const newPercent = displayerTime + 1;
          props.songTimeChanger(newPercent)
          setPlaytime(newPercent)
          if (newPercent >= 60){
            var minutes = Math.floor(newPercent / 60)
            var seconds = newPercent - minutes * 60 
            //seconds = seconds.toFixed(0)
            minutes = Math.floor(minutes)
            let minutesCheck10 = minutes < 10? `0${minutes}`: minutes
            let secondsCheck10 = seconds < 10? `0${seconds}`: seconds
            const realPercent = newPercent/songTime * 100
            setPercent(realPercent)
            setTimeDisplay(`${minutesCheck10}:${secondsCheck10}`)
            props.displayTimeChange(`${minutesCheck10}:${secondsCheck10}`)
            
          }else{
            const realPercent = newPercent/songTime * 100
            let secondsCheck10 = newPercent < 10? `0${newPercent}`: newPercent
            setPercent(realPercent)
            setTimeDisplay(`00:${secondsCheck10}`)
            props.displayTimeChange(`00:${secondsCheck10}`)
          }
        }, 1000);
        return () => clearInterval(interval);
      }else{
        console.log('stopped playing')
      }

   
    },[playtime]);

    return (
        <ProgressCircle
            percent={percent}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{props.displayTime}</Text>
        </ProgressCircle>
    )
}

export default Example;

Example.propTypes = {
  playTime: PropTypes.number, // current amount of time played in seconds
  songTime: PropTypes.number, // total seconds of song
  isPlaying: PropTypes.bool, // if the audio is playing
  songTimeChanger: PropTypes.func, //changes the state of playTime
  displayTime: PropTypes.string, // the display time 
  displayTimeChange: PropTypes.func, // set the state of displayTime


} 
