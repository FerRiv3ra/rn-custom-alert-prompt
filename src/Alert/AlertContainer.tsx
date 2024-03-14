import React from 'react';
import {Modal, Text, TextInput, View} from 'react-native';

import {Button} from './components/Button';
import {useAlertContainer} from './hooks/useAlertContainer';
import {useTheme} from './hooks/useTheme';
import {AlertData, PersonalTheme} from './types/alertTypes';

type Props = {
  animationType?: 'none' | 'fade' | 'slide';
  appearance?: 'light' | 'dark';
  personalTheme?: PersonalTheme;
  theme?: 'ios' | 'android';
};

export function AlertContainer({
  theme,
  appearance,
  personalTheme,
  animationType,
}: Props) {
  const {prompt, isAlert, setTextInput, handlePress} = useAlertContainer();
  const {styles, textButtonColor, cancelWeight, ios} = useTheme({
    theme,
    appearance,
    personalTheme,
  });

  if (!prompt) return;

  const {placeholderColor, backgroundColor} = personalTheme ?? {};

  const {
    title,
    buttons,
    cancelColorText,
    cancelText,
    confirmColorText,
    confirmText,
    description,
    label,
    placeholder,
  } = prompt;

  return (
    <Modal
      style={{zIndex: 100}}
      visible={!!prompt}
      transparent
      animationType={animationType}>
      <View
        style={{
          ...styles.modalContainer,
          backgroundColor: !!backgroundColor
            ? backgroundColor
            : 'rgba(0,0,0,0.4)',
        }}>
        <View
          style={{
            ...styles.modalView,
          }}>
          <Text style={{...styles.title}}>{title}</Text>
          {description && (
            <Text style={{...styles.description}}>{description}</Text>
          )}
          {!ios && !!label && <Text style={{...styles.label}}>{label}</Text>}
          {!isAlert && (
            <TextInput
              placeholder={placeholder ?? prompt.title}
              onChangeText={setTextInput}
              placeholderTextColor={
                !!placeholderColor
                  ? placeholderColor
                  : appearance === 'dark'
                  ? '#666'
                  : '#C3C3C3'
              }
              style={{...styles.textInput}}
            />
          )}

          <View style={{...styles.buttonsContainer}}>
            {!!buttons ? (
              buttons.map((button, index) => (
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
                {(!isAlert || (prompt as AlertData).showCancelButton) && (
                  <Button
                    button={{
                      text: cancelText ?? 'Cancel',
                      onPress: () => handlePress(true),
                      textStyle: {
                        color: cancelColorText ?? textButtonColor,
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
                    text: confirmText ? confirmText : isAlert ? 'Ok' : 'Done',
                    onPress: () => handlePress(),
                    textStyle: {
                      color: confirmColorText ?? textButtonColor,
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
