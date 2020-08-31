import React from 'react';
import { Text } from 'react-native';

import { DrawerItemsProps } from '~/types/types';

// import { Container } from './styles';

const DrawerItems: React.FC<DrawerItemsProps> = (props: DrawerItemsProps) => {
  const { route } = props;
  return <Text>Drawer Items: {route.params.tableName}</Text>;
};

export default DrawerItems;
