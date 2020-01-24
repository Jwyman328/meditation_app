import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

/**
 * Card showing Friend data and allowing ability to unfriend friend. 
 * 
 */
function UserFriendCard(props) {
    return (
        <View testID={'userCard'} style={styles.friendCard}>
            <View>
                <Text testID={`userCardUserFriendname${props.username}`}>{props.username}</Text>
                <Image style={styles.cardImage} source={{ uri: props.user_photo }} />
            </View>
            <TouchableOpacity onPress={() => props.removeFriend(props.username)}>
                <View>
                    <Ionicons name='ios-remove-circle-outline' size={75} color={'red'} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UserFriendCard;
UserFriendCard.propTypes = {
    /** username of Friend */
    username: PropTypes.string,
    /**Uri source of user photo */
    user_photo: PropTypes.string,
    /**Function to handle unfriending friend */
    removeFriend:PropTypes.func,
}
const styles = StyleSheet.create({
    cardImage: {
        width: Dimensions.get('window').width * .2,
        height: Dimensions.get('window').height * .1
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
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .65,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: Dimensions.get('window').height * .01,
    },

})