import {Appearance, Platform} from 'react-native';
import {getStyles} from '../theme';
import {Appearances, PersonalTheme, ValidPlatforms} from '../types/alertTypes';

type Props = {
  theme?: ValidPlatforms;
  appearance?: Appearances;
  personalTheme?: PersonalTheme;
};

export const useTheme = ({theme, appearance, personalTheme}: Props) => {
  if (!appearance) {
    appearance = Appearance.getColorScheme() as Appearances;
  }

  const dark = appearance === 'dark';
  const personalTextButtonColor = !!personalTheme
    ? personalTheme.textButtonColor
    : undefined;

  let platform = Platform.OS;
  let textButtonColor = personalTextButtonColor ?? '#4F87FF';
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
    textButtonColor = personalTextButtonColor ?? '#00d982';
  }

  return {
    styles: getStyles(platform, dark, personalTheme),
    ios: platform === 'ios',
    textButtonColor,
    cancelWeight,
  };
};
