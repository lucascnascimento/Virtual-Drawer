import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ResultSet } from 'react-native-sqlite-storage';
import { View } from 'react-native';
import { TableName } from '~/types/types';

import SearchBar from '~/components/SearchBar';
import ListContainer from '~/components/ListContainer';
import ListItem from '~/components/ListItem';
import translate from '~/translations';

import { Header, Icon } from './styles';

type SearchProps = {
  queryFunction: (searchField: string) => Promise<ResultSet>;
  deleteItem: (name: string) => Promise<ResultSet>;
  parent: string;
};

/**
 * Creates a container to search for items on the database, show and delete them.
 * @param queryFunction A function that will execute a search query in the database.
 * @param deleteItem A function to delete an item from the list.
 * @param parent The name of the parent screen
 */
const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { deleteItem, queryFunction, parent } = props;

  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Array<TableName>>([]);
  const [deletedItems, setDeletedItems] = useState<Array<string>>([]);
  const navigation = useNavigation();

  // Search for an item that is being typed on the search bar
  useEffect(() => {
    async function search() {
      const res = await queryFunction(searchValue);
      const { rows } = res;
      const itemArray: TableName[] = [];
      for (let i = 0; i < rows.length; i++) {
        itemArray.push(rows.item(i));
      }
      setList(itemArray);
      setLoading(false);
    }

    search();
  }, [queryFunction, searchValue]);

  /**
   * Deletes an item from the list.
   * @param name Name of the item to be deleted from the list.
   */
  async function deleteFromList(name: string) {
    try {
      const res = await deleteItem(name);
      const newList = list.filter((item) => item.name !== name);
      setList(newList);
      setDeletedItems((oldArray) => [...oldArray, name]);
      navigation.navigate(parent);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Action to be performed by the MessageModal's left button
   */
  function leftButtonHandler() {
    navigation.navigate(parent);
  }

  /**
   * Action to be performed by the ListItem's trash button
   * @param name Name of the item to be deleted
   */
  function trashButtonAction(name: string) {
    navigation.navigate('MessageModal', {
      title: translate('attention'),
      message: translate('deleteItemBody'),
      leftButtonLable: translate('cancel'),
      rightButtonLable: translate('yes'),
      leftButtonHandler,
      rightButtonHandler: deleteFromList,
      item: name,
    });
  }

  return (
    <>
      <Header>
        <Icon onPress={() => navigation.navigate('Home', { deletedItems })}>
          <MCIIcons name="arrow-left" size={32} color="rgba(0,0,0,0.32)" />
        </Icon>
        <SearchBar setSearchField={setSearchValue} setLoading={setLoading} />
      </Header>

      <View style={{ flex: 1 }}>
        <ListContainer
          list={list}
          loading={loading}
          renderItem={({ item }) => (
            <ListItem item={item} trashButtonAction={trashButtonAction} />
          )}
        />
      </View>
    </>
  );
};

export default Search;
