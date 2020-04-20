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

import FetchAllCourses from "../../store/actions/FetchAllCourses";
import AddRemoveFriend from "../../store/actions/addRemoveFriend";
import FetchUserFriends from "../../store/actions/FetchUserFriends";
import SendFriendRequest from "../../store/actions/sendFriendRequest";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";

import { Ionicons } from "@expo/vector-icons";

import UserFriendCard from "../friendsAndMsgs/components/userFriendCard";
import UserCard from "../friendsAndMsgs/components/userCard";
import { createUserCards } from "./utils/friendRequestHelpers";

//custom hooks
import useGetSearchUsersScreenState from "../../customHooks/friendsAndMsgsCustomHooks/useGetSearchUsersScreenState";

/**
 * Show all users allowing to search through and send friend request, or remove friend.
 *
 */
function SearchUsersScreen() {
  const {
    friendsUsernames,
    setFriendsUsernames,
    username,
    token,
    allUsers,
    friends,
    fetchUsersLoading,
    fetchUsersError,
  } = useGetSearchUsersScreenState();

  const dispatch = useDispatch();



  return (
    <View testID={"viewMain"} styles={styles.container}>
      {fetchUsersLoading ? (
        <Text>Loading</Text>
      ) : fetchUsersError ? (
        <Text testID={"errorMSG"}>Could not Find user list data</Text>
      ) : (
        <View testID={"successView"} style={styles.cardsContainer}>
          <Text style={styles.allUsersTitle} testID={"AllUsersTitle"}>
            All Users
          </Text>

          {allUsers && friendsUsernames ? (
            <FlatList
              testID={"userCard"}
              numColumns={1}
              data={allUsers}
              keyExtractor={(item) => item.username}
              renderItem={(user) =>
                createUserCards(
                  user,
                  username,
                  friendsUsernames,
                  dispatch,
                  token
                )
              }
            />
          ) : null}
        </View>
      )}
    </View>
  );
}

export default SearchUsersScreen;

const styles = StyleSheet.create({
  cardImage: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.1,
  },
  cardsContainer: {
    marginTop: Dimensions.get("window").height * 0.1,
    height: Dimensions.get("window").height * 0.7,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  friendCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width * 0.65,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    marginTop: Dimensions.get("window").height * 0.01,
  },
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  allUsersTitle: {
    fontSize: 33,
    fontFamily: "Helvetica-LightOblique",
  },
});
