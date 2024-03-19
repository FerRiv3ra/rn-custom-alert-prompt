import React from 'react';
import {Text, View} from 'react-native';
import {Icon as IconType} from '../types/alertTypes';

type Props = {
  icon: IconType;
  iconColor?: string;
  ios?: boolean;
};

export const Icon = ({icon, iconColor, ios}: Props) => {
  const icons = {
    error: '!',
    info: 'i',
    success: '✓',
    question: '?',
  };

  return (
    <View
      style={{
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: iconColor ? iconColor : ios ? '#4F87FF' : '#00d982',
        borderRadius: 50,
        borderWidth: 2,
        height: 30,
        marginLeft: ios ? 5 : 0,
        justifyContent: 'center',
        position: ios ? 'absolute' : 'relative',
        width: 30,
      }}>
      <Text
        style={{
          fontStyle: 'italic',
          fontWeight: '600',
          fontSize: 16,
          color: iconColor ? iconColor : ios ? '#4F87FF' : '#00d982',
        }}>
        {icons[icon]}
      </Text>
    </View>
  );
};
