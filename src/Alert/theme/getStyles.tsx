import {StyleSheet} from 'react-native';
import {ValidPlatforms} from '../types/alertTypes';

export const getStyles = (os: ValidPlatforms, dark = false) => {
  const ios = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      borderLeftColor: dark ? '#616161' : '#C3C3C3',
      borderTopColor: dark ? '#616161' : '#C3C3C3',
      borderTopWidth: 1,
      flex: 1,
      paddingVertical: 12,
    },
    buttonsContainer: {flexDirection: 'row', marginTop: 15},
    description: {
      color: dark ? '#FFF' : '#000',
      marginTop: 8,
      paddingHorizontal: '15%',
      textAlign: 'center',
    },
    label: {
      color: '#4F87FF',
      fontWeight: '700',
      marginTop: 15,
      paddingHorizontal: 20,
    },
    modalContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    modalView: {
      backgroundColor: dark ? '#222' : '#EEE',
      borderRadius: 10,
      paddingTop: 20,
      width: '90%',
    },
    textInput: {
      backgroundColor: dark ? '#1c1c1e' : '#FFF',
      borderColor: dark ? '#616161' : '#C3C3C3',
      borderRadius: 10,
      borderWidth: 1,
      marginHorizontal: '5%',
      marginTop: 10,
      padding: 7,
    },
    title: {
      color: dark ? '#FFF' : '#000',
      fontSize: 17,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  const android = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      paddingVertical: 12,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 25,
      justifyContent: 'flex-end',
      marginTop: 15,
      paddingHorizontal: 20,
    },
    description: {
      color: dark ? '#FFF' : '#000',
      marginBottom: 10,
      marginTop: 8,
      paddingHorizontal: 20,
    },
    label: {
      color: '#00d982',
      fontWeight: '700',
      marginTop: 15,
      paddingHorizontal: 20,
    },
    modalContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    modalView: {
      backgroundColor: dark ? '#282f2c' : '#FFF',
      borderRadius: 5,
      paddingTop: 20,
      width: '90%',
    },
    textInput: {
      borderBottomColor: '#00d982',
      borderBottomWidth: 1.5,
      borderRadius: 3,
      marginHorizontal: '5%',
      padding: 7,
    },
    title: {
      color: dark ? '#FFF' : '#000',
      fontSize: 17,
      fontWeight: '600',
      marginHorizontal: 20,
    },
  });

  return os === 'ios' ? ios : android;
};
