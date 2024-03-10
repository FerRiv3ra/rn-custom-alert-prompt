import {PromptData} from '../types/alertTypes';
import {
  notifySubscribers,
  subscribeToModalChange,
  subscribers,
} from './subscribers';

export function prompt(params: PromptData): Promise<string>;
export function prompt(
  title: string,
  description?: string,
  onPress?: () => void,
): Promise<string>;
export function prompt(
  param1: PromptData | string,
  param2?: string,
  onPress?: () => void,
): Promise<string> {
  let data: PromptData;
  if (typeof param1 === 'string') {
    data = {title: param1, description: param2, onPress};
  } else {
    data = param1;
  }
  notifySubscribers(data);

  return new Promise(res => {
    subscribeToModalChange(data => {
      subscribers.shift();
      res(data?.title!);
      notifySubscribers(undefined);
    });
  });
}
