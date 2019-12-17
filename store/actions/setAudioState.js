import React from 'react'

const SetAudioState = (audioStateSetting) => {
    return(
        {type:'SetAudioState', audioStateSetting:audioStateSetting}
    )
}

export default SetAudioState