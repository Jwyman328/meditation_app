import React, {useEffect} from 'react';
import {
    Text,
  } from "react-native";
function useSetFeetAndInchesRoladex(setFeet, setInches) {
    useEffect(() => {
        let feetSet = [];
        let inchSet = [];
    
        for (let i = 1; i <= 13; i++) {
          feetSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
          inchSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
        }
        setFeet(feetSet);
        setInches(inchSet);
      }, []);

}

export default useSetFeetAndInchesRoladex;