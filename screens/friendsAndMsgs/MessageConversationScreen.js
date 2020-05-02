import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Button,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import CreateMessage from "../../store/actions/friendsAndMsgs_actions/createMessage";
import FetchMessages from "../../store/actions/friendsAndMsgs_actions/FetchMessages";

import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";
import InputScrollView from "react-native-input-scroll-view";
import Message from "./components/message";
import MessageInput from "./components/messageInput";
import AllMessagesContainer from "./components/allMessagesContainer";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//helper functions 
import removeKeyboardFromScreen from './utils/removeKeyboardFromScreen';

//custom hooks
import useGetMessageConversationScreenState from "../../customHooks/friendsAndMsgsCustomHooks/useGetMessageConversationScreenState";

/**
 * Screen displays conversation of messages between two users.
 */
function MessageConversationScreen(props) {
  const {
    keyboardVisible,
    setKeyboardVisible,
    messages,
    token,
    username,
    fetchMessagesLoading,
    fetchMessagesError,
    reciever_username,
  } = useGetMessageConversationScreenState(props.navigation);

  const dispatch = useDispatch();

  /**
   * Post message to database.
   *
   * @param {string} value message test to be sent
   * @param {string} token jwt token to post message.
   * @param {string} reciever_username username of the intended reciever of the message
   */
  const sendMessage = (value, token, reciever_username) => {
    dispatch(CreateMessage(reciever_username, value, token));
  };
 

  const handleKeyboard = () => {
    setKeyboardVisible(true);
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Dimensions.get("window").height * 0.12}
      style={styles.screenContainer}
      behavior="position"
    >
      <View style={styles.anotherCont} onPress={() => removeKeyboardFromScreen(setKeyboardVisible)}>
        {fetchMessagesLoading ? (
          <Text testID={"loadingTitle"}>Messages Loading</Text>
        ) : fetchMessagesError ? (
          <Text testID={"errorTitle"}>Error Loading Messages</Text>
        ) : (
          <View>
            <AllMessagesContainer
              messages={messages}
              keyboardVisible={keyboardVisible}
            >
              <MessageInput
                reciever_username={reciever_username}
                token={token}
                handleKeyboard={handleKeyboard}
                sendMessage={sendMessage}
              />
            </AllMessagesContainer>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default MessageConversationScreen;

MessageConversationScreen.navigationOptions = (navData) => {
  reciever_username = navData.navigation.getParam("sendToUsername");
  return {
    headerTitle: reciever_username,
  };
};
const styles = StyleSheet.create({
  msgContainer: {
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").width,
    borderColor: "gray",
    borderWidth: 1,
  },
  msgContainerModified: {
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width,
    borderColor: "gray",
    //borderWidth: 1,
  },
  screenContainer: {
    maxHeight: Dimensions.get("window").height * 1.6,
    minHeight: Dimensions.get("window").height * 0.8,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    //borderWidth:3,
    borderColor: "yellow",
  },
  anotherCont: {
    width: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").height * 1.2,
    minHeight: Dimensions.get("window").height * 0.9,
    borderColor: "green",
    //borderWidth:2
  },
});
