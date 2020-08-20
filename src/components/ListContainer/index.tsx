import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ResultSet } from 'react-native-sqlite-storage';

import { Separator } from './styles';

import ListItem from '~/components/ListItem';

import { TableName } from '~/types/types';

type ListContainerProps = {
  getListItems: () => Promise<ResultSet>;
  deleteItem: (name: string) => Promise<ResultSet>;
};

const ListContainer = ({
  getListItems,
  deleteItem,
}: ListContainerProps): JSX.Element => {
  const [list, setList] = useState<Array<TableName>>([]);

  useEffect(() => {
    async function getList() {
      const res = await getListItems();
      const { rows } = res;
      const itemArray: TableName[] = [];
      for (let i = 1; i < rows.length; i++) {
        itemArray.push(rows.item(i));
      }
      setList(itemArray);
    }

    getList();
  }, [getListItems]);

  async function deleteFromList(name: string) {
    try {
      const res = await deleteItem(name);
      const newList = list.filter((item) => item.name !== name);
      setList(newList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View testID="ListContainer">
      <FlatList
        data={list}
        keyExtractor={(listItem) => listItem.name}
        renderItem={({ item }) => (
          <ListItem item={item} deleteItem={deleteFromList} />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

export default ListContainer;
