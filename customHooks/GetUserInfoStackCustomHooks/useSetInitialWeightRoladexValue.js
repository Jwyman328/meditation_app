import React, {useEffect} from 'react';
import {Text} from 'react-native';

function useSetInitialWeightRoladexValue(setWeights) {
    useEffect(() => {
        let weightSet = [];
        for (let i = 1; i <= 300; i++) {
          weightSet.push(<Text style={{ fontSize: 28 }}>{i}</Text>);
        }
        setWeights(weightSet);
      }, []);
}

export default useSetInitialWeightRoladexValue;