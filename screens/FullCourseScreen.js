import React, {useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import audioBookPlaylist from '../Data/AudioBookPlaylist' 
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import MainHeaderButton from '../components/HeaderButton';

import {Ionicons} from '@expo/vector-icons'

import {useDispatch, useSelector} from 'react-redux'
import addFavorite from '../store/actions/addFavorite'

function FullCourseScreen(props){
    const data = props.navigation.getParam('courseData')
    console.log(data.AudioCoursesId, 'ids')

        //add the dispatched function to add the item to the favorite
    const courseId = data.courseId

    const disptach = useDispatch()

    const addCourseToFavorites = () => {
        disptach(addFavorite(courseId))
    }

    useEffect(() => {
        if (data){
            console.log(courseId, 'id')
            props.navigation.setParams({addCourseToFavorites: addCourseToFavorites})
        }else{
            console.log(data)
        }
        
    },[data])
    

    const goToMeditation = (meditaionId) => {
        props.navigation.navigate('IndividualMeditationScreen', {data:{meditationId: meditaionId, uri: data.uri}})
    }

    const createMeditationCard = (item) => {
        const title = audioBookPlaylist[item].title
        const time = audioBookPlaylist[item].time
        const orderNumber = audioBookPlaylist[item].orderNumber

        return (
        <TouchableOpacity onPress={() => goToMeditation(item)} style={{ width: '100%'}} >
            <View style={styles.meditationcard}>
                <Text style={{color:'black', fontSize:20, marginLeft:4}}>{orderNumber}.</Text>
                <Text style={{color:'black', fontSize:20}}>{title}</Text>
                <Text style={{fontSize:20}}>{time}</Text>
                <View style={{marginRight:4}}>
                    <Ionicons  size={35} onPress={() => goToMeditation(item)}  name='ios-play-circle' title='play' />
                </View>
            </View>
        </TouchableOpacity>)
    }

    return (
        
        <View style={{flex:1}} >

            <ImageBackground style={{justifyContent:'center', alignItems:'center', flex:1}} source={{uri:data.uri}}>
                <View style={{justifyContent:'center', alignItems:'center', flex:.3}}>
                    <Text style={{textAlign:'center', color:'white',fontSize: 30}}>{data.title}</Text>
                </View>
                <View style={{flex:1, marginTop:20, justifyContent:'center', alignItems:'center'}}>
                    <FlatList contentContainerStyle={{alignItems:'center'}} data={data.AudioCoursesId} renderItem={({item}) => createMeditationCard(item)} />
                </View>
            </ImageBackground>
            
        </View>
       
    )
}

export default FullCourseScreen;

FullCourseScreen.navigationOptions = (navData) => {
    const addCourseToFavorites = navData.navigation.getParam('addCourseToFavorites')
    const addFavorite = () => {
        console.log(addCourseToFavorites)
        console.log('add fav to catagories')
        addCourseToFavorites()

    }
    return (
        {
            headerRight: 
                 <ScrollView style={{marginTop:Dimensions.get('window').height * .02}} horizontal={true}>
                 <HeaderButtons HeaderButtonComponent={MainHeaderButton}>
                     <Item title='filter' color='black' iconName='ios-star' onPress={ addFavorite } />
                 </HeaderButtons>      
                     
                 </ScrollView>,
 
        }
    )
}

const styles = StyleSheet.create({
    meditationcard : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderStyle:'solid',
        borderWidth:2,
        borderRadius:20,
        height: Dimensions.get('window').height * .10,
        backgroundColor:'grey',
        opacity:.7,
        width: Dimensions.get('window').width * .9,
        marginTop: 5,
        

    
    }
})