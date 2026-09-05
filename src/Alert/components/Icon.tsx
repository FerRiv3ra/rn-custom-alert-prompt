import {StyleSheet, Text, View} from 'react-native';
import type {Icon as IconType} from '../types/alertTypes';

type Props = {
  icon: IconType;
  iconColor?: string;
  ios?: boolean;
};

const GLYPHS: Record<IconType, string> = {
  error: '!',
  info: 'i',
  success: '✓',
  question: '?',
};

export const Icon = ({icon, iconColor, ios}: Props) => {
  const color = iconColor ? iconColor : ios ? '#4F87FF' : '#00d982';

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.container,
        ios ? styles.ios : styles.android,
        {borderColor: color},
      ]}>
      <Text style={[styles.glyph, {color}]}>{GLYPHS[icon]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 2,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  ios: {
    marginLeft: 5,
    position: 'absolute',
  },
  android: {
    marginLeft: 0,
    position: 'relative',
  },
  glyph: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 16,
  },
});
