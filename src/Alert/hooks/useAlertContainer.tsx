import {useEffect, useState} from 'react';
import {
  notifySubscribers,
  subscribeToModalChange,
} from '../helpers/subscribers';
import {AlertData, PromptData} from '../types/alertTypes';

export const useAlertContainer = () => {
  const [prompt, setPrompt] = useState<AlertData | PromptData>();
  const [isAlert, setIsAlert] = useState(false);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    subscribeToModalChange((data, alert) => {
      setPrompt(data);
      setIsAlert(!!alert);
      setTextInput('');
    });
  }, [prompt]);

  const handlePress = (cancel = false) => {
    if (!isAlert) {
      notifySubscribers({
        title: textInput,
      });
    } else {
      notifySubscribers(cancel ? undefined : prompt);
    }
  };

  return {
    prompt,
    isAlert,
    setTextInput,
    handlePress,
  };
};
