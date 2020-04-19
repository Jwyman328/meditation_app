import React, { useEffect } from "react";

/**
 * Go to the app homeScreen when the user has successfully recieved a token from signing in.
 */
function useLoginUserOnToken(token, navigation) {
  useEffect(() => {
    if (token) {
      navigation.navigate("Tabs");
    }
  }, [token]);
}

export default useLoginUserOnToken;
