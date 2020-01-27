import React from 'react'
import {Text} from 'react-native'

/**
 * 
 * @param {function} setTickValues setState function.
 */
 const createTickValues = (setTickValues,minimum,maximum) => {
    let tickSet = []
    for (let tickValue = minimum; tickValue <= maximum; tickValue++) {
        tickSet.push(<Text style={{ fontSize: 28 }}>{tickValue}</Text>);
    }
    setTickValues(tickSet)
 }

 export default createTickValues