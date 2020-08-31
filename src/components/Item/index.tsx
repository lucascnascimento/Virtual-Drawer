import React from 'react';
import { Text, View } from 'react-native';

import { Container } from './styles';

type ItemProps = {
  mode: 'create' | 'edit' | 'show';
};

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const { mode } = props;

  return <Text>Item </Text>;
};

export default Item;
