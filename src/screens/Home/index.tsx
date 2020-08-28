import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { HomeProps, TableName } from '~/types/types.ts';
import translate from '~/translations';

import ListContainer from '~/components/ListContainer';
import ListItem from '~/components/ListItem';
import SearchAndAddIcons from '~/components/SearchAndAddIcons';

import db from '~/database/db';

const Home: React.FC<HomeProps> = ({ navigation }: HomeProps) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Array<TableName>>([]);

  /**
   * Get tables from database
   */
  async function getList() {
    setLoading(true);
    const res = await db.indexTables();
    const { rows } = res;
    const itemArray: TableName[] = [];
    for (let i = 0; i < rows.length; i++) {
      itemArray.push(rows.item(i));
    }
    setList(itemArray);
    setLoading(false);
  }

  /**
   * Deletes an item from the list.
   * @param name Name of the item to be deleted from the list.
   */
  async function deleteFromList(name: string) {
    try {
      const res = await db.dropTable(name);
      const newList = list.filter((item) => item.name !== name);
      setList(newList);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Loads the tables list from the database on component mount
   */
  useEffect(() => {
    getList();
  }, []);

  useLayoutEffect(() => {
    /**
     * Create a database table on InputModal add action
     * @param inputText Database table name
     */
    async function handleAddAction(inputText: string) {
      try {
        const res = await db.createTable(inputText);
        const { rows } = res;
        for (let i = 0; i < rows.length; i++) {
          const item = rows.item(i);
        }
        navigation.navigate('Home');
        getList();
      } catch (error) {
        console.log(error);
      }
    }

    navigation.setOptions({
      headerRight: () => (
        <SearchAndAddIcons handleAddAction={handleAddAction} />
      ),
    });
  }, [navigation]);

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
      leftButtonHandler: () => navigation.navigate('Home'),
      rightButtonHandler: deleteFromList,
      item: name,
    });
  }

  return (
    <View accessibilityLabel="home screen">
      <ListContainer
        loading={loading}
        list={list}
        renderItem={({ item }) => (
          <ListItem item={item} trashButtonAction={trashButtonAction} />
        )}
      />
    </View>
  );
};

export default Home;
