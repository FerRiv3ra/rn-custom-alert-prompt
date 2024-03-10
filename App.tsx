import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AlertContainer, alert, prompt} from './src';

export const App = () => {
  const onPress = async (type: 'prompt' | 'alert') => {
    if (type === 'alert') {
      const resp = await alert({
        title: 'Alert',
        description:
          'Would you like to continue learning how to use iOS alerts?',
        showCancelButton: true,
      });
      console.log(resp);
    } else {
      const resp = await prompt({
        title: 'Prompt',
        description:
          'Would you like to continue learning how to use iOS alerts?',
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
        <AlertContainer />
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
