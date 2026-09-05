import {fireEvent, render, screen} from '@testing-library/react-native';
import {App} from '../../App';

describe('App example', () => {
  it('opens Alert and closes via Ok', async () => {
    await render(<App />);

    fireEvent.press(screen.getByText('Open Alert'));
    await screen.findByText('Alert');
    await fireEvent.press(screen.getByText('Ok'));

    expect(screen.queryByText('Alert')).toBeNull();
  });

  it('opens Prompt and allows typing with empty default value', async () => {
    await render(<App />);

    fireEvent.press(screen.getByText('Open Prompt'));

    const input = await screen.findByPlaceholderText('example@example.com');
    await fireEvent.changeText(input, 'typed@example.com');

    await screen.findByDisplayValue('typed@example.com');
    await fireEvent.press(screen.getByText('Done'));
  });

  it('opens Prompt with defaultValue and allows editing', async () => {
    await render(<App />);

    fireEvent.press(screen.getByText('Open Prompt with default value'));

    const input = await screen.findByTestId('prompt-input');
    await screen.findByDisplayValue('pre-filled@example.com');
    await fireEvent.changeText(input, 'changed@example.com');

    await screen.findByDisplayValue('changed@example.com');
    await fireEvent.press(screen.getByText('Done'));
  });
});
