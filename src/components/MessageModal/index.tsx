import React from 'react';
import { Modal, StyleSheet, Text } from 'react-native';
import { MessageModalProps } from '~/types/types';

import {
  Container,
  Header,
  Title,
  Body,
  Footer,
  Button,
  ModalView,
} from './styles';

const MessageModal: React.FC<MessageModalProps> = ({
  route,
}: MessageModalProps) => {
  return (
    <Modal animationType="fade" transparent visible>
      <Container>
        <ModalView style={styles.boxShadow}>
          <Header>
            <Title>{route.params.title}</Title>
          </Header>
          <Body>
            <Text>{route.params.message}</Text>
          </Body>
          <Footer>
            <Button onPress={route.params.leftButtonHandler}>
              <Text>{route.params.leftButtonLable}</Text>
            </Button>
            <Button
              onPress={() =>
                route.params.rightButtonHandler(route.params.item)
              }>
              <Text>{route.params.rightButtonLable}</Text>
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
