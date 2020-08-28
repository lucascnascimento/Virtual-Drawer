import React, { useState } from 'react';
import { Modal, Alert, Text, StyleSheet } from 'react-native';
import translate from '~/translations';
import { InputModalProps } from '~/types/types';

import {
  Container,
  Header,
  Title,
  Body,
  Input,
  Footer,
  Button,
  ModalView,
} from './styles';

const InputModal: React.FC<InputModalProps> = ({
  navigation,
  route,
}: InputModalProps) => {
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState(false);

  const regex = new RegExp('^[a-zA-Z0-9]+$');

  /**
   * Handle and validates the input text
   * @param text Text written on input
   */
  function handleTextChange(text: string) {
    setInputText(text);
    if (!regex.test(text)) {
      setInputError(true);
    } else if (text.length < 3) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <Container>
        <ModalView style={styles.boxShadow}>
          <Header>
            <Title>{translate('enterDrawerName')}</Title>
          </Header>
          <Body>
            <Input
              inputError={inputError}
              value={inputText}
              onChangeText={handleTextChange}
              placeholder="Gaveta"
              returnKeyType="send"
              onSubmitEditing={() => {
                route.params.handleAddAction(inputText);
              }}
            />
          </Body>
          <Footer>
            <Button
              onPress={() => {
                navigation.goBack();
              }}>
              <Text>{translate('cancel')}</Text>
            </Button>
            <Button
              onPress={() => {
                route.params.handleAddAction(inputText);
              }}
              disabled={inputError}
              style={inputError && { opacity: 0.5 }}>
              <Text>{translate('create')}</Text>
            </Button>
          </Footer>
        </ModalView>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default InputModal;
