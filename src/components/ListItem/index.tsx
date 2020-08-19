import React from 'react';
import { Alert, Animated, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import { TableName } from '~/types/types';

import { Container, Icon, Body, BodyTitle, TrashButton } from './styles';

type ListItemProps = { item: TableName };

const ListItem: React.FC = ({ item }: ListItemProps) => {
  function renderRightAction() {
    return (
      <TrashButton onPress={() => console.log('lixo')}>
        <SLIcon name="trash" size={24} color="#fff" />
      </TrashButton>
    );
  }

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <Container onPress={() => console.log('pressionado')}>
        <Icon>
          <MCIIcon name="file-cabinet" size={32} color="#000" />
        </Icon>
        <Body>
          <BodyTitle>{item.name}</BodyTitle>
        </Body>
      </Container>
    </Swipeable>
  );
};

export default ListItem;
