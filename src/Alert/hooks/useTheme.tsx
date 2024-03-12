import {Platform} from 'react-native';
import {getStyles} from '../theme';
import {ValidPlatforms} from '../types/alertTypes';

type Props = {
  theme?: ValidPlatforms;
  appearance?: 'light' | 'dark';
};

export const useTheme = ({theme, appearance}: Props) => {
  const dark = appearance === 'dark';

  let platform = Platform.OS;
  let textButtonColor = '#4F87FF';
  let cancelWeight: '500' | '700' = '500';

  if (!!theme) {
    if (theme === 'ios') {
      platform = 'ios';
    } else {
      platform = 'android';
    }
  }

  if (platform === 'ios') {
    cancelWeight = '700';
  } else {
    platform = 'android';
    textButtonColor = '#00d982';
  }

  return {
    styles: getStyles(platform, dark),
    ios: platform === 'ios',
    textButtonColor,
    cancelWeight,
  };
};
