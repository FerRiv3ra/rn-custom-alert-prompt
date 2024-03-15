import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
// import {Alert, AlertContainer} from 'rn-custom-alert-prompt';
import {Alert, AlertContainer} from './src';

export const App = () => {
  const onPress = async (type: 'prompt' | 'alert') => {
    if (type === 'alert') {
      const resp = await Alert.alert({
        title: 'Alert',
        description:
          'Would you like to continue learning how to use React Native alerts?',
        showCancelButton: true,
      });
      console.log(resp);
    } else {
      const resp = await Alert.prompt({
        title: 'Prompt',
        description:
          'Enter your email to continue learning how to use React Native alerts!',
        label: 'Email',
        placeholder: 'example@example.com',
      });
      console.log({resp});
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <AlertContainer theme="android" appearance="dark" />
        <TouchableOpacity
          onPress={() => onPress('alert')}
          style={{backgroundColor: 'blue', padding: 8, borderRadius: 4}}>
          <Text
            style={{
              color: '#FFF',
              fontWeight: '800',
              fontSize: 16,
              fontFamily: 'serif',
            }}>
            Open Alert
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress('prompt')}
          style={{backgroundColor: 'blue', padding: 8, borderRadius: 4}}>
          <Text
            style={{
              color: '#FFF',
              fontWeight: '800',
              fontSize: 16,
              fontFamily: 'serif',
            }}>
            Open Prompt
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
