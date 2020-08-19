import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Separator } from './styles';

import ListItem from '~/components/ListItem';

import { TableName } from '~/types/types';

type ListContainerProps = { tables: Array<TableName> };

const ListContainer = ({ tables }: ListContainerProps): JSX.Element => {
  return (
    <View testID="ListContainer">
      <FlatList
        data={tables}
        keyExtractor={(table) => table.name}
        renderItem={({ item }) => <ListItem item={item} />}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

export default ListContainer;
