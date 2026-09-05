import {act, fireEvent, render, screen} from '@testing-library/react-native';

import {Alert, AlertContainer} from '../index';
import {getListenerCount} from '../Alert/helpers/subscribers';

describe('Alert', () => {
  it('subscribes once per container and cleans up on unmount', async () => {
    const view = await render(<AlertContainer />);
    expect(getListenerCount()).toBe(1);

    // Open and close several alerts: the listener count must not grow.
    for (let i = 0; i < 3; i++) {
      let promise: Promise<boolean> | undefined;
      await act(async () => {
        promise = Alert.alert('Title', 'Description');
      });
      await fireEvent.press(await screen.findByText('Ok'));
      await expect(promise).resolves.toBe(true);
    }
    expect(getListenerCount()).toBe(1);

    await view.unmount();
    expect(getListenerCount()).toBe(0);
  });

  it('resolves false when cancelled and runs onPress only when confirmed', async () => {
    await render(<AlertContainer />);
    const onPress = jest.fn();

    let cancelled: Promise<boolean> | undefined;
    await act(async () => {
      cancelled = Alert.alert({
        title: 'Delete?',
        showCancelButton: true,
        cancelText: 'Keep',
      });
    });
    await fireEvent.press(await screen.findByText('Keep'));
    await expect(cancelled).resolves.toBe(false);

    let confirmed: Promise<boolean> | undefined;
    await act(async () => {
      confirmed = Alert.alert('Save?', 'Sure?', onPress);
    });
    await fireEvent.press(await screen.findByText('Ok'));
    await expect(confirmed).resolves.toBe(true);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('custom buttons run their onPress and resolve false', async () => {
    await render(<AlertContainer />);
    const onRed = jest.fn();

    let result: Promise<boolean> | undefined;
    await act(async () => {
      result = Alert.alert({
        title: 'Pick',
        buttons: [{text: 'Green'}, {text: 'Red', onPress: onRed}],
      });
    });
    await fireEvent.press(await screen.findByText('Red'));
    expect(onRed).toHaveBeenCalledTimes(1);
    await expect(result).resolves.toBe(false);
  });

  it('prompt resolves with the typed text or undefined when cancelled', async () => {
    await render(<AlertContainer />);

    let result: Promise<string | undefined> | undefined;
    await act(async () => {
      result = Alert.prompt({title: 'Name', placeholder: 'Type'});
    });
    await fireEvent.changeText(
      await screen.findByPlaceholderText('Type'),
      'Fer',
    );
    await fireEvent.press(screen.getByText('Done'));
    await expect(result).resolves.toBe('Fer');

    let cancelled: Promise<string | undefined> | undefined;
    await act(async () => {
      cancelled = Alert.prompt('Name');
    });
    await fireEvent.press(await screen.findByText('Cancel'));
    await expect(cancelled).resolves.toBeUndefined();
  });

  it('prompt pre-fills defaultValue, runs onPress and submits from the keyboard', async () => {
    await render(<AlertContainer />);
    const onPress = jest.fn();

    let result: Promise<string | undefined> | undefined;
    await act(async () => {
      result = Alert.prompt({title: 'Email', defaultValue: 'a@b.com'});
    });
    const input = await screen.findByTestId('prompt-input');
    expect(input.props.value).toBe('a@b.com');
    await fireEvent.press(screen.getByText('Done'));
    await expect(result).resolves.toBe('a@b.com');

    let submitted: Promise<string | undefined> | undefined;
    await act(async () => {
      submitted = Alert.prompt('Email', undefined, onPress);
    });
    const second = await screen.findByTestId('prompt-input');
    expect(second.props.value).toBe('');
    await fireEvent.changeText(second, 'c@d.com');
    await fireEvent(second, 'submitEditing');
    await expect(submitted).resolves.toBe('c@d.com');
    expect(onPress).toHaveBeenCalledWith('c@d.com');
  });

  it('a second request cancels the previous one', async () => {
    await render(<AlertContainer />);

    let first: Promise<boolean> | undefined;
    let second: Promise<boolean> | undefined;
    await act(async () => {
      first = Alert.alert('First', 'one');
    });
    await act(async () => {
      second = Alert.alert('Second', 'two');
    });
    await expect(first).resolves.toBe(false);
    await fireEvent.press(await screen.findByText('Ok'));
    await expect(second).resolves.toBe(true);
  });

  it('Alert.dismiss closes the current request as cancelled', async () => {
    await render(<AlertContainer />);

    let result: Promise<boolean> | undefined;
    await act(async () => {
      result = Alert.alert('Wait', 'for it');
    });
    await screen.findByText('Wait');
    await act(async () => {
      Alert.dismiss();
    });
    await expect(result).resolves.toBe(false);
    expect(screen.queryByText('Wait')).toBeNull();

    // No-op when nothing is open.
    Alert.dismiss();
  });

  it('the hardware back button cancels the request', async () => {
    await render(<AlertContainer />);

    let result: Promise<boolean> | undefined;
    await act(async () => {
      result = Alert.alert('Back', 'press');
    });
    await screen.findByText('Back');
    await fireEvent(screen.getByText('Back'), 'requestClose');
    await expect(result).resolves.toBe(false);
  });
});
