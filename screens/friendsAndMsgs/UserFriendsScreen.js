import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import FetchFavorites from "../../store/actions/meditation_actions/fetchFavorites";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import FriendCard from "../friendsAndMsgs/components/friendCard";
import useGetUserFriendsScreenState from "../../customHooks/friendsAndMsgsCustomHooks/useGetUserFriendsScreenState";
/**
 * Display All Friends in card form.
 *
 */
function UserFriendsScreen(props) {
  const {
    username,
    token,
    friends,
    fetchFriendsLoading,
    fetchFriendsError,
  } = useGetUserFriendsScreenState();

  /**
   * Navigate to MessageConversationScreen for selected friend.
   * @param {string} username Username of friend to see current/create new conversation.
   */
  const navigateToMessageConversationScreen = (username) => {
    props.navigation.navigate("CreateMessage", { sendToUsername: username });
  };

  /**
   * Create a friendCard.
   * @param {Object} item Contains Friend username,friend uri to photo
   */
  const createFriendCards = (item) => {
    return (
      <FriendCard
        sendMsg={navigateToMessageConversationScreen}
        item={item.item}
      />
    );
  };

  return (
    <View styles={styles.container}>
      {fetchFriendsLoading ? (
        <Text testID={"loadingMSG"}>Friends loading</Text>
      ) : fetchFriendsError ? (
        <Text testID={"errorMSG"}>Could not load friends</Text>
      ) : (
        <View style={styles.cardsContainer}>
          <Text testID={"friendsTitle"} style={styles.titleText}>
            My Friends
          </Text>
          {friends ? (
            <FlatList
              numColumns={1}
              data={friends}
              keyExtractor={(item) => item.username}
              renderItem={(friend) => createFriendCards(friend)}
            />
          ) : null}
        </View>
      )}
    </View>
  );
}

export default UserFriendsScreen;

const styles = StyleSheet.create({
  cardsContainer: {
    marginTop: Dimensions.get("window").height * 0.1,
    height: Dimensions.get("window").height * 0.7,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.1,
    backgroundColor: "green",
  },
  title: {
    marginTop: Dimensions.get("window").height * 0.05,
    color: colors.base,
    fontSize: 33,
    fontFamily: "Helvetica-LightOblique",
  },
  titleText: {
    fontSize: 33,
    fontFamily: "Helvetica-LightOblique",
  },
});
