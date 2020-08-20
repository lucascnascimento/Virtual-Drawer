import React from 'react';
import { Alert, Animated, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import db from '~/database/db';

import { TableName } from '~/types/types';

import { Container, Icon, Body, BodyTitle, TrashButton } from './styles';

type ListItemProps = { item: TableName };

const ListItem: React.FC = ({ item }: ListItemProps) => {
  async function handleDelete() {
    try {
      const res = await db.dropTable(item.name);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function renderRightAction() {
    return (
      <TrashButton onPress={handleDelete}>
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

// todo: treat handle delete error
