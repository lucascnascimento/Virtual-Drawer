import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Separator } from './styles';

import { Item, TableName } from '~/types/types';

type ListContainerProps = {
  list: Array<TableName> | Array<Item>;
  loading: boolean;
  renderItem: ({ item }: { item: TableName }) => JSX.Element;
  children: React.ReactElement;
};

/**
 * Renders a list
 * @param list List of items to be rendered
 * @param loading Loading flag to show loading effect
 * @param renderItem Component to be rendered by the ListContainer
 * @param children Child component rendered by the list, usually a Toast
 */
const ListContainer: React.FC<ListContainerProps> = (
  props: ListContainerProps,
) => {
  const { list, loading, renderItem, children } = props;

  return (
    <View testID="ListContainer">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(listItem) => listItem.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Separator />}
        />
      )}
      {children}
    </View>
  );
};

export default ListContainer;
