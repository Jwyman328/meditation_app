import React from 'react'
import {View, Text} from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

function MainHeaderButtonLarge(props){
    return (
        <HeaderButton IconComponent={Ionicons} {...props} iconSize={40}  />
    )
}

export default MainHeaderButtonLarge