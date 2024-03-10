import {AlertData, Icon} from '../types/alertTypes';
import {
  notifySubscribers,
  subscribeToModalChange,
  subscribers,
} from './subscribers';

export function alert(params: AlertData): Promise<boolean>;
export function alert(
  title: string,
  description: string,
  icon?: Icon,
  onPress?: () => void,
): Promise<boolean>;
export function alert(
  param1: AlertData | string,
  param2?: string,
  icon?: Icon,
  onPress?: () => void,
): Promise<boolean> {
  let data: AlertData;
  if (typeof param1 === 'string') {
    data = {title: param1, description: param2!, icon, onPress};
  } else {
    data = param1;
  }
  notifySubscribers(data, true);

  return new Promise(res => {
    subscribeToModalChange(data => {
      subscribers.shift();
      res(!!data);
      notifySubscribers(undefined);
    });
  });
}
