import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../theme/alertStyles';
import {Button as ButtonType} from '../types/alertTypes';

type Props = {
  button: ButtonType;
  isFirst?: boolean;
};

export const Button = ({button, isFirst}: Props) => {
  const {text, onPress, textStyle} = button;

  return (
    <TouchableOpacity
      style={{...styles.button, borderLeftWidth: isFirst ? 0 : 1}}
      activeOpacity={0.6}
      onPress={onPress}>
      <Text style={[{textAlign: 'center'}, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
