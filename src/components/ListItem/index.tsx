import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';

import { TableName } from '~/types/types';

import { Container, Icon, Body, BodyTitle, TrashButton } from './styles';

type ListItemProps = {
  item: TableName;
  trashButtonAction: (name: string) => void;
};

/**
 * Renders an item information
 * @param item Item to be rendered
 * @param trashButtonAction Action to be performed by the trash button
 */
const ListItem: React.FC<ListItemProps> = ({
  item,
  trashButtonAction,
}: ListItemProps) => {
  /**
   * Renders element when swiped to the left
   */
  function renderRightAction() {
    return (
      <TrashButton onPress={() => trashButtonAction(item.name)}>
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
