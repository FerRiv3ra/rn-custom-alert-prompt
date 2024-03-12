import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {Button as ButtonType, ValidPlatforms} from '../types/alertTypes';

type Props = {
  button: ButtonType;
  isFirst?: boolean;
  theme?: ValidPlatforms;
  appearance?: 'light' | 'dark';
};

export const Button = ({button, isFirst, theme, appearance}: Props) => {
  const {text, onPress, textStyle} = button;
  const {styles, ios} = useTheme({theme, appearance});

  return (
    <TouchableOpacity
      style={{...styles.button, borderLeftWidth: ios ? (isFirst ? 0 : 1) : 0}}
      activeOpacity={0.6}
      onPress={onPress}>
      <Text style={[{textAlign: ios ? 'center' : 'right'}, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
