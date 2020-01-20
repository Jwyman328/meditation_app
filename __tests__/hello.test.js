import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import NewMessageForm from '../Hello';
import { Updates } from 'expo';
import { element } from 'prop-types';

describe('Hello', () => {
  it('displays the passed-in name', () => {
    const {getByPlaceholder, getByTestId, update } = render(<NewMessageForm />);
    const response = getByPlaceholder('message')
    //response.props.value = 'new value'
    fireEvent(response, 'onChangeText','new' )
    //update(<NewMessageForm />)
    const testid = getByTestId('messageText')
    console.log(response.props.value)
    expect(response.props.value).toBe('new')
    //console.log(response.props)

    //fireEvent.changeText(getByTestId('messageText'),'what up boy') 

  }); 
});