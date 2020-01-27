import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { PropTypes } from 'prop-types'

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
            <Text testID={`friendUserName${props.item.username}`}>{props.item.username}</Text>
            <Image testID={`friendPhoto${props.item.user_photo}`} style={styles.cardImage} source={{ uri: props.item.user_photo }} />
            <TouchableOpacity testID={`sendFriendMessage${props.item.username}`} onPress={() => props.sendMsg(props.item.username)}>
                <View>
                    <Ionicons name='ios-mail' size={45} color={'red'} />
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
        height: Dimensions.get('window').height * .1
    },
    friendCard: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .65,
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: Dimensions.get('window').height * .01,
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
})