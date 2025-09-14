/**
 * @format
 */

import {describe, it, jest} from '@jest/globals';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {App} from '../App';

jest.mock('react-native/Libraries/Modal/Modal', () => {
    const { View } = require('react-native');
    return ({ visible = true, ...props }) =>
        visible ? <View {...props} /> : null;
});

describe('App prompt defaultValue', () => {
  it('opens Alert and closes via Ok', async () => {
    const {getByText, findByText} = render(<App />);

    fireEvent.press(getByText('Open Alert'));

    await findByText('Alert');

    fireEvent.press(getByText('Ok'));
  });

  it('opens Prompt and allows typing with empty default value', async () => {
    const {getByText, findByPlaceholderText, findByDisplayValue} = render(
        <App />
    );

    fireEvent.press(getByText('Open Prompt'));

    const input = await findByPlaceholderText('example@example.com');
    fireEvent.changeText(input, 'typed@example.com');

    await findByDisplayValue('typed@example.com');
    fireEvent.press(getByText('Done'));
  });

  it('opens Prompt with defaultValue and allows editing', async () => {
    const {getByText, findByTestId, findByDisplayValue} = render(<App />);

    fireEvent.press(getByText('Open Prompt with default value'));

    const input = await findByTestId('prompt-input');
    await findByDisplayValue('pre-filled@example.com');
    fireEvent.changeText(input, 'changed@example.com');

    await findByDisplayValue('changed@example.com');
    fireEvent.press(getByText('Done'));
  });
});
