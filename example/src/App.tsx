import {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Alert, AlertContainer} from 'rn-custom-alert-prompt';
import type {AlertContainerProps} from 'rn-custom-alert-prompt';

type Theme = NonNullable<AlertContainerProps['theme']>;
type Appearance = NonNullable<AlertContainerProps['appearance']>;

const Demo = () => {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const [theme, setTheme] = useState<Theme | undefined>();
  const [appearance, setAppearance] = useState<Appearance | undefined>();
  const [result, setResult] = useState('Press a button');

  const dark = (appearance ?? scheme) === 'dark';
  const show = (value: unknown) => setResult(JSON.stringify(value));

  const demos: {title: string; run: () => Promise<unknown>}[] = [
    {
      title: 'Alert',
      run: () => Alert.alert('Alert', 'Simple alert with a single Ok button'),
    },
    {
      title: 'Alert with cancel + icon',
      run: () =>
        Alert.alert({
          title: 'Continue?',
          description:
            'Would you like to continue learning how to use React Native alerts?',
          showCancelButton: true,
          icon: 'question',
        }),
    },
    {
      title: 'Alert with custom buttons',
      run: () =>
        Alert.alert({
          title: 'Pick a colour',
          description: 'Each button runs its own onPress',
          icon: 'info',
          buttons: [
            {text: 'Green', textStyle: {color: 'green'}},
            {text: 'Blue', textStyle: {color: 'blue'}},
            {text: 'Red', textStyle: {color: 'red', fontWeight: '700'}},
          ],
        }),
    },
    {
      title: 'Alert with onPress callback',
      run: () =>
        Alert.alert('Save?', 'onPress runs only when confirmed', () =>
          setResult('onPress ran'),
        ),
    },
    {
      title: 'Prompt',
      run: () =>
        Alert.prompt({
          title: 'Prompt',
          description: 'Enter your email to continue',
          label: 'Email',
          placeholder: 'example@example.com',
        }),
    },
    {
      title: 'Prompt with default value',
      run: () =>
        Alert.prompt({
          title: 'Prompt',
          description: 'The input is pre-filled',
          label: 'Email',
          defaultValue: 'pre-filled@example.com',
        }),
    },
    {
      title: 'Auto dismiss after 2s',
      run: () => {
        setTimeout(() => Alert.dismiss(), 2000);
        return Alert.alert('Wait', 'Closes itself in two seconds');
      },
    },
  ];

  return (
    <View
      style={[
        styles.root,
        dark && styles.rootDark,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <AlertContainer
        theme={theme}
        appearance={appearance}
        animationType="fade"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, dark && styles.textDark]}>
          rn-custom-alert-prompt
        </Text>

        <Text style={[styles.label, dark && styles.textDark]}>Theme</Text>
        <View style={styles.row}>
          {(['auto', 'ios', 'android'] as const).map(value => (
            <Chip
              key={value}
              label={value}
              active={(theme ?? 'auto') === value}
              onPress={() => setTheme(value === 'auto' ? undefined : value)}
            />
          ))}
        </View>

        <Text style={[styles.label, dark && styles.textDark]}>Appearance</Text>
        <View style={styles.row}>
          {(['auto', 'light', 'dark'] as const).map(value => (
            <Chip
              key={value}
              label={value}
              active={(appearance ?? 'auto') === value}
              onPress={() =>
                setAppearance(value === 'auto' ? undefined : value)
              }
            />
          ))}
        </View>

        <Text style={[styles.label, dark && styles.textDark]}>Demos</Text>
        {demos.map(demo => (
          <Pressable
            key={demo.title}
            accessibilityRole="button"
            onPress={() => demo.run().then(show)}
            style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>{demo.title}</Text>
          </Pressable>
        ))}

        <Text style={[styles.label, dark && styles.textDark]}>Result</Text>
        <Text
          testID="result"
          style={[styles.result, dark && styles.resultDark]}>
          {result}
        </Text>
      </ScrollView>
    </View>
  );
};

const Chip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{selected: active}}
    onPress={onPress}
    style={[styles.chip, active && styles.chipActive]}>
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </Pressable>
);

export const App = () => (
  <SafeAreaProvider>
    <Demo />
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#F4F4F6'},
  rootDark: {backgroundColor: '#121214'},
  content: {
    padding: 20,
    gap: 10,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  title: {fontSize: 22, fontWeight: '700', marginBottom: 6},
  label: {fontSize: 13, fontWeight: '600', opacity: 0.6, marginTop: 10},
  textDark: {color: '#FFF'},
  row: {flexDirection: 'row', gap: 8},
  chip: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4F87FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: {backgroundColor: '#4F87FF'},
  chipText: {color: '#4F87FF', fontWeight: '600'},
  chipTextActive: {color: '#FFF'},
  button: {backgroundColor: '#4F87FF', padding: 12, borderRadius: 8},
  pressed: {opacity: 0.7},
  buttonText: {color: '#FFF', fontWeight: '600', textAlign: 'center'},
  result: {
    fontFamily: 'monospace',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
  },
  resultDark: {backgroundColor: '#1E1E22', color: '#FFF'},
});
