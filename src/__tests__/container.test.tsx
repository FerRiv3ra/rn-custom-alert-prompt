import {act, fireEvent, render, screen} from '@testing-library/react-native';

import {Alert, AlertContainer} from '../index';
import type {AlertContainerProps} from '../index';

// Returns the pending promise wrapped in an object: returning it directly
// would make `await open()` wait for the alert itself.
const open = async (run: () => Promise<unknown>) => {
  let promise: Promise<unknown> | undefined;
  await act(async () => {
    promise = run();
  });
  return {promise: promise!};
};

describe('AlertContainer', () => {
  it('renders nothing until a request is made', async () => {
    await render(<AlertContainer />);
    expect(screen.queryByText('Ok')).toBeNull();
  });

  it('uses custom button texts and hides the cancel button by default', async () => {
    await render(<AlertContainer />);

    const {promise} = await open(() =>
      Alert.alert({title: 'Custom', confirmText: 'Sure'}),
    );
    expect(await screen.findByText('Sure')).toBeTruthy();
    expect(screen.queryByText('Cancel')).toBeNull();
    await fireEvent.press(screen.getByText('Sure'));
    await expect(promise).resolves.toBe(true);

    const {promise: second} = await open(() =>
      Alert.prompt({title: 'Name', cancelText: 'Nope', confirmText: 'Go'}),
    );
    expect(await screen.findByText('Nope')).toBeTruthy();
    expect(screen.getByText('Go')).toBeTruthy();
    await fireEvent.press(screen.getByText('Nope'));
    await expect(second).resolves.toBeUndefined();
  });

  it('shows the prompt label on Android and hides it on iOS', async () => {
    const props: AlertContainerProps = {theme: 'android'};
    const view = await render(<AlertContainer {...props} />);

    await open(() => Alert.prompt({title: 'Email', label: 'Your email'}));
    expect(await screen.findByText('Your email')).toBeTruthy();
    await fireEvent.press(screen.getByText('Cancel'));

    await view.rerender(<AlertContainer theme="ios" />);
    await open(() => Alert.prompt({title: 'Email', label: 'Your email'}));
    await screen.findByText('Email');
    expect(screen.queryByText('Your email')).toBeNull();
    await fireEvent.press(screen.getByText('Cancel'));
  });

  it('applies personalTheme colours to title and buttons', async () => {
    await render(
      <AlertContainer
        appearance="dark"
        personalTheme={{titleColor: '#123456', textButtonColor: '#ABCDEF'}}
      />,
    );

    await open(() => Alert.alert({title: 'Themed', showCancelButton: true}));
    const title = await screen.findByText('Themed');
    expect(title).toHaveStyle({color: '#123456'});
    expect(screen.getByText('Ok')).toHaveStyle({color: '#ABCDEF'});
    expect(screen.getByText('Cancel')).toHaveStyle({color: '#ABCDEF'});
    await fireEvent.press(screen.getByText('Ok'));
  });

  it('renders one button per custom button and the icon glyph', async () => {
    await render(<AlertContainer />);

    await open(() =>
      Alert.alert({
        title: 'Pick',
        icon: 'success',
        buttons: [{text: 'A'}, {text: 'B'}, {text: 'C'}],
      }),
    );
    expect(
      await screen.findByText('✓', {includeHiddenElements: true}),
    ).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.queryByText('Ok')).toBeNull();
    await fireEvent.press(screen.getByText('C'));
  });

  it('the input placeholder falls back to the title', async () => {
    await render(<AlertContainer />);

    await open(() => Alert.prompt('Nickname'));
    expect(await screen.findByPlaceholderText('Nickname')).toBeTruthy();
    await fireEvent.press(screen.getByText('Cancel'));
  });
});
