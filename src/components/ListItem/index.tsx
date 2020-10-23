import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';

import { Item, TableName } from '~/types/types';

import { Container, Body, BodyTitle, TrashButton } from './styles';

type ListItemProps = {
  item: TableName | Item;
  trashButtonAction: (name?: string, id?: number) => void;
  navigateTo: string;
  icon: React.ReactNode;
};

/**
 * Renders an item information
 * @param item Item to be rendered.
 * @param trashButtonAction Action to be performed by the trash button.
 * @param navigateTo Name of the screen that will be navigated to when component is pressed.
 * @param icon Icon to be displayed on the left side of the component.
 */
const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const { item, trashButtonAction, navigateTo, icon } = props;
  const navigation = useNavigation();

  /**
   * Renders element when swiped to the left
   */
  function renderRightAction() {
    return (
      <TrashButton onPress={() => trashButtonAction(item.name, item.id)}>
        <SLIcon name="trash" size={24} color="#fff" />
      </TrashButton>
    );
  }

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <Container
        onPress={() =>
          navigation.navigate(navigateTo, { tableName: item.name })
        }>
        {icon}
        <Body>
          <BodyTitle>{item.name}</BodyTitle>
        </Body>
      </Container>
    </Swipeable>
  );
};

export default ListItem;
