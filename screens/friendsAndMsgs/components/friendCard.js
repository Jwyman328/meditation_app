import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { PropTypes } from 'prop-types'
import colors from '../../../constants/colors'

/**
 * A card containing friend information with ability to navigate to send friend a message.
 * 
 * @param {String} props.item.username Username of friend.
 * @param {String} props.item.user_photo Uri to photo of friend.
 * @param {Function} props.sendMsg Function To navigate to messageScreen with friend.
 */
function FriendCard(props) {
    return (
        <View testID={'friendMainView'} key={props.item.username} style={styles.friendCard}>
            <View>
                <Image testID={`friendPhoto${props.item.user_photo}`} style={styles.cardImage} source={{ uri: props.item.user_photo }} />
            </View>
            <View>
                <Text style={styles.cardText} testID={`friendUserName${props.item.username}`}>{props.item.username}</Text>
            </View>
            <TouchableOpacity testID={`sendFriendMessage${props.item.username}`} onPress={() => props.sendMsg(props.item.username)}>
                <View style={styles.addRemoveIcon}>
                    <Ionicons name='ios-mail' size={45} color={'white'} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FriendCard;

FriendCard.propTypes = {
    /** title text to be displated */
    user_name: PropTypes.string,
};

const styles = StyleSheet.create({
    cardImage: {
        width: Dimensions.get('window').width * .2,
        height: Dimensions.get('window').height * .1,
        //borderWidth:4,
        borderRadius:Dimensions.get('window').width * .2/2,
        overflow: 'hidden',
        marginHorizontal: 10,

    },
    cardsContainer: {
        marginTop: Dimensions.get('window').height * .1,
        height: Dimensions.get('window').height * .7,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    friendCard: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width * .85,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: Dimensions.get('window').height * .01,
        backgroundColor:colors.base,
    },
    cardText: {
        fontFamily:'Helvetica-LightOblique',
        fontSize:20,
    },
    addRemoveIcon: {
        marginRight: 10,
    }
})