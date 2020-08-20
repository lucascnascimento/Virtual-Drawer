import React from 'react';
import { Modal, StyleSheet, Text } from 'react-native';

import {
  Container,
  Header,
  Title,
  Body,
  Footer,
  Button,
  ModalView,
} from './styles';

interface MessageModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmAction(): void;
  cancelAction(): void;
}

const MessageModal: React.FC = ({
  visible,
  title,
  message,
  confirmText,
  confirmAction,
  cancelText,
  cancelAction,
}: MessageModalProps) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Container>
        <ModalView style={styles.boxShadow}>
          <Header>
            <Title>{title}</Title>
          </Header>
          <Body>
            <Text>{message}</Text>
          </Body>
          <Footer>
            <Button onPress={cancelAction}>
              <Text>{cancelText}</Text>
            </Button>
            <Button onPress={confirmAction}>
              <Text>{confirmText}</Text>
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

export default MessageModal;
