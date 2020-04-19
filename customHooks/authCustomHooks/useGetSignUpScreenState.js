import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetSignUpScreenState() {
  const [firstName, onChangeUserFirstName] = React.useState("");
  const [lastName, onChangeUserLastName] = React.useState("");
  const [userName, onChangeUserName] = React.useState("");
  const [passWord, onChangePassword] = React.useState("");
  const [passWordTwo, onChangePasswordTwo] = React.useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.AuthData.token);
  // get signUp post request status
  const signUpFetchError = useSelector(
    (state) => state.AuthData.signUpFetchError
  );
  const signUpFetchLoading = useSelector(
    (state) => state.AuthData.signUpFetchLoading
  );

  return {
    firstName,
    onChangeUserFirstName,
    lastName,
    onChangeUserLastName,
    userName,
    onChangeUserName,
    passWord,
    onChangePassword,
    passWordTwo,
    onChangePasswordTwo,
    dispatch,
    token,
    signUpFetchError,
    signUpFetchLoading,

  };
}

export default useGetSignUpScreenState;
