import React from 'react';
import {Modal, Text, TextInput, View} from 'react-native';

import {Button} from './components/Button';
import {useAlertContainer} from './hooks/useAlertContainer';
import {styles} from './theme/alertStyles';
import {AlertData} from './types/alertTypes';

export function AlertContainer() {
  const {prompt, isAlert, setTextInput, handlePress} = useAlertContainer();

  return (
    <Modal style={{zIndex: 100}} visible={!!prompt} transparent>
      <View
        style={{...styles.modalContainer, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            ...styles.modalView,
            backgroundColor: '#fafafa',
          }}>
          <Text style={{...styles.title}}>{prompt?.title}</Text>
          {prompt && prompt.description && (
            <Text style={{...styles.description}}>{prompt.description}</Text>
          )}
          {!isAlert && (
            <TextInput
              placeholder="Placeholder"
              onChangeText={setTextInput}
              style={{...styles.textInput}}
            />
          )}

          <View style={{...styles.buttonsContainer}}>
            {!!prompt?.buttons ? (
              prompt?.buttons.map((button, index) => (
                <Button button={button} isFirst={index === 0} key={index} />
              ))
            ) : (
              <>
                {(!isAlert ||
                  (prompt && (prompt as AlertData).showCancelButton)) && (
                  <Button
                    button={{
                      text: 'Cancel',
                      onPress: () => handlePress(true),
                      textStyle: {color: '#2e62f2', fontWeight: '700'},
                    }}
                    isFirst
                  />
                )}
                <Button
                  button={{
                    text: 'Done',
                    onPress: () => handlePress(),
                    textStyle: {
                      color: '#2e62f2',
                      fontWeight: isAlert ? '500' : '700',
                    },
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
