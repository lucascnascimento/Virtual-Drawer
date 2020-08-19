import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import {
  LongPressGestureHandler,
  State,
  TapGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import { TableName } from '~/types/types';

import { Container, Icon, Body, BodyTitle, Trash } from './styles';

type ListItemProps = { item: TableName };

const ListItem: React.FC = ({ item }: ListItemProps) => {
  function handleTap({ nativeEvent }) {
    nativeEvent.state === State.END && console.log('Short Press');
  }

  function handleLongPress({ nativeEvent }) {
    nativeEvent.state === State.END && console.log('Looooong Press');
  }

  return (
    <TapGestureHandler onHandlerStateChange={handleTap}>
      <LongPressGestureHandler
        onHandlerStateChange={handleLongPress}
        minDurationMs={500}>
        <Container>
          <Icon>
            <MCIIcon name="file-cabinet" size={32} color="#000" />
          </Icon>
          <Body>
            <BodyTitle>{item.name}</BodyTitle>
          </Body>
          <Trash>
            <SLIcon name="trash" size={24} color="#FFF" />
          </Trash>
        </Container>
      </LongPressGestureHandler>
    </TapGestureHandler>
  );
};

export default ListItem;
