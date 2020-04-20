import React, {useEffect} from 'react';
import createTickValues from '../../screens/GetUserInfoStack/utils/scrollPickerArrayCreator' 

function useCreateRoladexTickValues() {
    useEffect(() => {
        //create tick values for month and year scroll picker
        createTickValues(setmonth,1,17)
        createTickValues(setyeares,1935,2030)
    }, [])
}

export default useCreateRoladexTickValues;