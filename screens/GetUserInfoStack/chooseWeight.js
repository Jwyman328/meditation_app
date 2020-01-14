import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'
import ScrollPicker from 'react-native-wheel-scroll-picker';


function ChooseWeight(props) {
    const [weight, setWeights] = useState([])
    const [weightChoosen, setweightChoosen] = useState(150)
    const goToChooseHeight= () => {
        props.navigation.navigate('ChooseHeight')
    }
    useEffect(() => {
        let weightSet = [];

        for (let i = 1; i <= 300; i++) {
            weightSet.push(<Text style={{fontSize:28}}>{i}</Text>);
            
            }
        setWeights(weightSet)
    },[])
       
    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textIntro}>Your Weight (lbs)</Text>
            </View>
           {weight? 
           <View style={styles.pickerContainer}> 
               <ScrollPicker
                  dataSource={
                    weight
                  }
                  selectedIndex={149}
                  renderItem={(data, index, isSelected) => {
                      //
                  }}
                  onValueChange={(data, selectedIndex) => {
                      //
                      console.log(selectedIndex + 1)
                      setweightChoosen(selectedIndex + 1)
                  }}
                
                  wrapperHeight={250}
                  wrapperWidth={250}
                  wrapperBackground={'white'}
                  itemHeight={70}
                  highlightColor={colors.base}
                  highlightBorderWidth={5}
                  activeItemColor={'#222121'}
                  itemColor={colors.strongPrimary}
                /></View>: null}
          
          <TouchableOpacity onPress={goToChooseHeight} >
                <View style={styles.buttonContainer}>
                    <View style={styles.text}>
                        <Text style={{ color: 'black', opacity: 1, fontSize: 25 }}> Continue </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChooseWeight;

const styles = StyleSheet.create({
    pickerContainer: {
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * .6,
    },
    text: {
        opacity: 1,

    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: colors.lightSecondary,
        alignItems: 'center',

    },
    textContainer: {
        marginTop: Dimensions.get('window').height * .03,
        width: Dimensions.get('window').width * .83,
        //height: Dimensions.get('window').height,
        marginBottom: Dimensions.get('window').height * .05
    },
    textIntro: {
        fontSize: 24,
        fontFamily: 'Helvetica-Oblique',
        textAlign: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .05,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .1,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 0,
        backgroundColor: 'white',
        opacity: .3,
    },
})
