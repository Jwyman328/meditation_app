import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

/**
 * Card showing user data and allowing ability to send user a friend request. 
 * 
 */
function UserCard(props) {
    return (
        <View testID={'userCard'} style={styles.friendCard}>
            <View>
                <Image style={styles.cardImage} source={{ uri: props.user_photo }} />
            </View>
            <View>
                <Text style={styles.cardText} testID={`userCardUsername${props.username}`}>{props.username}</Text>
            </View>
            <TouchableOpacity onPress={() => props.sendFriendRequest(props.username)}>
                <View style={styles.addRemoveIcon}>
                    <Ionicons name='md-person-add' size={45} color={'green'} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UserCard;
UserCard.propTypes = {
    /** username of user */
    username: PropTypes.string,
    /**Uri source of user profile picture */
    user_photo: PropTypes.string,
    /**Function to handle send friend request to a user */
    sendFriendRequest:PropTypes.func,
}
const styles = StyleSheet.create({
    cardImage: {
        width: Dimensions.get('window').width * .2,
        height: Dimensions.get('window').height * .1, 
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