import {StyleProp, TextStyle} from 'react-native';

export type Icon = 'error' | 'info' | 'success';

export type Button = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export type PromptData = {
  title: string;
  description?: string;
  buttons?: Button[];
  onPress?: () => void;
};

export interface AlertData extends PromptData {
  showCancelButton?: boolean;
  icon?: Icon;
}
