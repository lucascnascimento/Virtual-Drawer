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
  navigation,
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
            <Button
              onPress={() =>
                navigation.navigate(route.params.parentScreen, {
                  render: false,
                })
              }>
              <Text>{route.params.cancelText}</Text>
            </Button>
            <Button
              onPress={() =>
                navigation.navigate(route.params.parentScreen, {
                  render: true,
                  item: route.params.item,
                })
              }>
              <Text>{route.params.confirmText}</Text>
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
