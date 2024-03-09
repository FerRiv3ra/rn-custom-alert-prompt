export type Icon = 'error' | 'info' | 'success';

export type Button = {
  text: string;
  textColor?: string;
  onPress?: () => void;
};

export type PromptData = {
  title: string;
  description?: string;
  icon?: Icon;
  buttons?: Button[];
};
