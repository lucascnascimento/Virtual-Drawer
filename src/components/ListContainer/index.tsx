import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// import { Container } from './styles';

import { TableName } from '~/types/types';

type ListContainerProps = { tables: Array<TableName> };

const ListContainer = ({ tables }: ListContainerProps): JSX.Element => {
  return (
    <View testID="ListContainer">
      <FlatList
        data={tables}
        keyExtractor={(table) => table.name}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default ListContainer;
