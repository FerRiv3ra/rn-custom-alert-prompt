import React, {useEffect, useRef, useState} from 'react';
import {Modal, Platform, Text, TextInput, View} from 'react-native';
import {Button} from './components/Button';
import {styles} from './theme/alertStyles';
import {PromptData} from './types/alertTypes';

let subscribers: ((data?: PromptData) => void)[] = [];

function notifySubscribers(data?: PromptData) {
  subscribers.forEach(subscriber => subscriber(data));
}

function subscribeToModalChange(callback: (data?: PromptData) => void) {
  subscribers.push(callback);
}

export function AlertContainer() {
  const isAndroid = Platform.OS === 'android';

  const [prompt, setPrompt] = useState<PromptData | undefined>();
  const textInputRef = useRef<TextInput>(null);

  function close() {
    notifySubscribers(undefined);
  }

  function done() {
    if (prompt?.title.trim() !== '') {
      notifySubscribers({
        title: prompt?.title.trim() ?? '',
      });
    }
  }

  useEffect(() => {
    subscribeToModalChange(data => {
      setPrompt(data);
    });
  }, []);

  useEffect(() => {
    if (prompt) {
      setTimeout(
        () => {
          try {
            textInputRef.current?.focus();
          } catch (error) {
            console.error(error);
          }
        },
        isAndroid ? 40 : 1,
      );
    }
  }, [prompt]);

  return (
    <Modal style={{zIndex: 100}} visible={!!prompt} transparent>
      <View
        style={{...styles.modalContainer, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            ...styles.modalView,
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
          }}>
          <Text style={{...styles.title}}>{prompt?.title}</Text>

          <View style={{...styles.buttonsContainer}}>
            {!!prompt?.buttons ? (
              prompt?.buttons.map(button => <Button button={button} />)
            ) : (
              <>
                <Button
                  button={{
                    text: 'Cancel',
                    onPress: close,
                    textColor: '#FF0000',
                  }}
                />
                <Button
                  button={{text: 'Done', onPress: done, textColor: '#03fc17'}}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function prompt(params: PromptData | string): Promise<boolean> {
  const data: PromptData =
    typeof params === 'string' ? {title: params} : params;
  notifySubscribers(data);

  return new Promise(res => {
    subscribeToModalChange(data => {
      subscribers.shift();
      notifySubscribers(undefined);
      res(!!data);
    });
  });
}
