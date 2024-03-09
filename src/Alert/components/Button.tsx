import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../theme/alertStyles';
import {Button as ButtonType} from '../types/alertTypes';

type Props = {
  button: ButtonType;
};

export const Button = ({button}: Props) => {
  const {text, onPress, textColor} = button;

  return (
    <TouchableOpacity
      style={{...styles.button}}
      activeOpacity={0.6}
      onPress={onPress}>
      <Text style={{color: textColor, textAlign: 'center'}}>{text}</Text>
    </TouchableOpacity>
  );
};
