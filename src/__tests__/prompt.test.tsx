import {act, fireEvent, render, screen} from '@testing-library/react-native';

import {Alert, AlertContainer} from '../index';

const open = async (run: () => Promise<unknown>) => {
  let promise: Promise<unknown> | undefined;
  await act(async () => {
    promise = run();
  });
  return {promise: promise!};
};

describe('Prompt input options', () => {
  it('forwards keyboardType, secureTextEntry, autoCapitalize and maxLength', async () => {
    await render(<AlertContainer />);

    await open(() =>
      Alert.prompt({
        title: 'PIN',
        keyboardType: 'number-pad',
        secureTextEntry: true,
        autoCapitalize: 'none',
        maxLength: 4,
      }),
    );
    const input = await screen.findByTestId('prompt-input');
    expect(input.props.keyboardType).toBe('number-pad');
    expect(input.props.secureTextEntry).toBe(true);
    expect(input.props.autoCapitalize).toBe('none');
    expect(input.props.maxLength).toBe(4);
    await fireEvent.press(screen.getByText('Cancel'));
  });

  it('spreads inputProps but keeps the managed props', async () => {
    await render(<AlertContainer />);
    const onFocus = jest.fn();

    const {promise} = await open(() =>
      Alert.prompt({
        title: 'Email',
        placeholder: 'you@example.com',
        inputProps: {
          onFocus,
          autoCorrect: false,
          returnKeyType: 'send',
          style: {fontSize: 20},
        },
      }),
    );
    const input = await screen.findByPlaceholderText('you@example.com');
    expect(input.props.autoCorrect).toBe(false);
    expect(input.props.returnKeyType).toBe('send');
    expect(input).toHaveStyle({fontSize: 20});
    await fireEvent(input, 'focus');
    expect(onFocus).toHaveBeenCalled();

    await fireEvent.changeText(input, 'a@b.c');
    await fireEvent(input, 'submitEditing');
    await expect(promise).resolves.toBe('a@b.c');
  });
});

describe('Backdrop', () => {
  it('does not dismiss by default', async () => {
    await render(<AlertContainer />);

    await open(() => Alert.alert('Stay', 'put'));
    await screen.findByText('Stay');
    await fireEvent.press(
      screen.getByTestId('alert-backdrop', {includeHiddenElements: true}),
    );
    expect(screen.getByText('Stay')).toBeTruthy();
    await fireEvent.press(screen.getByText('Ok'));
  });

  it('dismisses as cancelled with dismissOnBackdropPress', async () => {
    await render(<AlertContainer dismissOnBackdropPress />);

    const {promise} = await open(() => Alert.prompt('Name'));
    await screen.findByText('Name');
    await fireEvent.press(
      screen.getByTestId('alert-backdrop', {includeHiddenElements: true}),
    );
    await expect(promise).resolves.toBeUndefined();
    expect(screen.queryByText('Name')).toBeNull();
  });
});
