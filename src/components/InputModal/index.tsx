import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
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

/**
 * Creates an modal with an input text field
 * @param navigation Navigation object passed by previous screen
 * @param route Route props
 */
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
  );
};

export default InputModal;
