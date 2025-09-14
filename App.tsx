import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {Alert, AlertContainer} from 'rn-custom-alert-prompt';
import {Alert, AlertContainer} from './src';

export const App = () => {
  const onPress = async (type: 'prompt' | 'alert' | 'prompt-default-value') => {
    if (type === 'alert') {
      const resp = await Alert.alert({
        title: 'Alert',
        description:
          'Would you like to continue learning how to use React Native alerts?',
        showCancelButton: true,
        icon: 'success',
        iconColor: 'green',
        // buttons: [
        //   {
        //     text: 'Cancelar',
        //     textStyle: {color: 'green'},
        //     onPress: () => console.log('Green'),
        //   },
        //   {
        //     text: 'Ok',
        //     textStyle: {color: 'blue'},
        //     onPress: () => console.log('Blue'),
        //   },
        //   {
        //     text: 'Tercero',
        //     textStyle: {color: 'red'},
        //     onPress: () => console.log('Red'),
        //   },
        // ],
      });
      console.log(resp);
    } else if (type === 'prompt') {
      const resp = await Alert.prompt({
        title: 'Prompt',
        description:
          'Enter your email to continue learning how to use React Native alerts!',
        label: 'Email',
        placeholder: 'example@example.com',
      });
      console.log({resp});
    } else if (type === 'prompt-default-value') {
      const resp = await Alert.prompt({
        title: 'Prompt',
        description:
          'Enter your email to continue learning how to use React Native alerts!',
        label: 'Email',
        defaultValue: 'pre-filled@example.com',
      });
      console.log({resp});
    }
  };

  return (
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
        <Text style={styles.buttonText}>Open Alert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress('prompt')}
        style={{backgroundColor: 'blue', padding: 8, borderRadius: 4}}>
        <Text style={styles.buttonText}>Open Prompt</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress('prompt-default-value')}
        style={{backgroundColor: 'blue', padding: 8, borderRadius: 4}}>
        <Text style={styles.buttonText}>Open Prompt with default value</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'serif',
  },
});
