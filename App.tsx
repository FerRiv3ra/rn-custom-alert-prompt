import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AlertContainer, prompt} from './src';

export const App = () => {
  const onPress = async () => {
    const resp = await prompt('Hola');
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AlertContainer />
        <TouchableOpacity
          onPress={onPress}
          style={{backgroundColor: 'blue', padding: 2}}>
          <Text>Open modal</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
