import React from 'react'

const handleInitialState = (initialFullState, reducerName,newDataObjs) => {

    let newState = JSON.parse(JSON.stringify(initialFullState));
    console.log(newState === initialFullState)
    const mapIt = newDataObjs.map((reducerNewData) => {
        let keys =  Object.keys(reducerNewData)[0]
        let values = Object.values(reducerNewData)[0]
        newState[reducerName][keys] = values
    })
    return newState
}

export default handleInitialState;