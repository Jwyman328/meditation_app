import React from 'react'

/**
 * Convert seconds to string representing minutes and seconds.
 * 
 * Example: '08:35'
 * @param {number} secs 
 */
const convertSecToMinSec = (secs) => {
    if (secs >= 60) {
        var minutes = Math.floor(secs / 60)
        var seconds = secs - minutes * 60
        minutes = Math.floor(minutes)
        let minutesCheck10 = minutes < 10 ? `${minutes}` : minutes
        let secondsCheck10 = seconds < 10 ? `0${seconds}` : seconds
        return `${minutesCheck10}:${secondsCheck10}`
    } else {
        // if you hacent reached a minue yet just display the seconds
        let secondsCheck10 = secs < 10 ? `0${secs}` : secs
        return `00:${secondsCheck10}`
    }
}

export default convertSecToMinSec;