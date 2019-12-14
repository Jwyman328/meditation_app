import React from 'react'
import {View, Text} from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

function MainHeaderButton(props){
    return (
        <HeaderButton IconComponent={Ionicons} {...props} iconSize={25}  />
    )
}

export default MainHeaderButton