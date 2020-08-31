import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';

import { TableName } from '~/types/types';

import { Container, Icon, Body, BodyTitle, TrashButton } from './styles';

type ListItemProps = {
  item: TableName;
  trashButtonAction: (name: string) => void;
  navigateTo: string;
};

/**
 * Renders an item information
 * @param item Item to be rendered
 * @param trashButtonAction Action to be performed by the trash button
 * @param navigateTo Name of the screen that will be navigated to when component is pressed
 */
const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const { item, trashButtonAction, navigateTo } = props;
  const navigation = useNavigation();

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
      <Container
        onPress={() =>
          navigation.navigate(navigateTo, { tableName: item.name })
        }>
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
