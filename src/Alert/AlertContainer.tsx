import React from 'react';
import {Modal, Text, TextInput, View} from 'react-native';

import {Button} from './components/Button';
import {useAlertContainer} from './hooks/useAlertContainer';
import {useTheme} from './hooks/useTheme';
import {AlertData, PersonalTheme} from './types/alertTypes';

type Props = {
  theme?: 'ios' | 'android';
  appearance?: 'light' | 'dark';
  personalTheme?: PersonalTheme;
};

export function AlertContainer({theme, appearance}: Props) {
  const {prompt, isAlert, setTextInput, handlePress} = useAlertContainer();
  const {styles, textButtonColor, cancelWeight, ios} = useTheme({
    theme,
    appearance,
  });

  return (
    <Modal style={{zIndex: 100}} visible={!!prompt} transparent>
      <View
        style={{...styles.modalContainer, backgroundColor: 'rgba(0,0,0,0.4)'}}>
        <View
          style={{
            ...styles.modalView,
          }}>
          <Text style={{...styles.title}}>{prompt?.title}</Text>
          {prompt && prompt.description && (
            <Text style={{...styles.description}}>{prompt.description}</Text>
          )}
          {!ios && !!prompt?.label && (
            <Text style={{...styles.label}}>{prompt.label}</Text>
          )}
          {!isAlert && (
            <TextInput
              placeholder={prompt?.placeholder ?? 'Placeholder'}
              onChangeText={setTextInput}
              placeholderTextColor={appearance === 'dark' ? '#666' : '#C3C3C3'}
              style={{...styles.textInput}}
            />
          )}

          <View style={{...styles.buttonsContainer}}>
            {!!prompt?.buttons ? (
              prompt?.buttons.map((button, index) => (
                <Button
                  button={button}
                  isFirst={index === 0}
                  key={index}
                  theme={theme}
                  appearance={appearance}
                />
              ))
            ) : (
              <>
                {(!isAlert ||
                  (prompt && (prompt as AlertData).showCancelButton)) && (
                  <Button
                    button={{
                      text: 'Cancel',
                      onPress: () => handlePress(true),
                      textStyle: {
                        color: textButtonColor,
                        fontWeight: cancelWeight,
                      },
                    }}
                    theme={theme}
                    appearance={appearance}
                    isFirst
                  />
                )}
                <Button
                  button={{
                    text: isAlert ? 'Ok' : 'Done',
                    onPress: () => handlePress(),
                    textStyle: {
                      color: textButtonColor,
                      fontWeight: isAlert ? '500' : '700',
                    },
                  }}
                  theme={theme}
                  appearance={appearance}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
