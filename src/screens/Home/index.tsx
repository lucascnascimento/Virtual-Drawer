import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeProps, TableName } from '~/types/types.ts';
import translate from '~/translations';

import ListContainer from '~/components/ListContainer';
import ListItem from '~/components/ListItem';
import HeaderRightIcons from '~/components/HeaderRightIcons';
import SearchButton from '~/components/SearchButton';
import AddButton from '~/components/AddButton';
import Toast from '~/components/Toast';

import db from '~/database/db';

/**
 * App's home screen
 * @param route Parameters to be sent by SearchTable screen and trigger re-render
 */
const Home: React.FC<HomeProps> = ({ route }: HomeProps) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Array<TableName>>([]);
  const navigation = useNavigation();
  const [visibleToast, setVisibleToast] = useState(false);

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
      setVisibleToast(true);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Loads the tables list from the database on component mount
   */
  useEffect(() => {
    getList();
  }, [route.params.deletedItems]);

  /**
   * Change toast state back to false
   */
  useEffect(() => {
    setVisibleToast(false);
  }, [visibleToast]);

  /**
   * Set the right header icons and defines action for handling the add table function
   */
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
        <HeaderRightIcons
          leftSideButton={() => (
            <SearchButton
              searchButtonAction={() => navigation.navigate('SearchTable')}
            />
          )}
          rightSideButton={() => (
            <AddButton
              addButtonAction={() =>
                navigation.navigate('InputModal', { handleAddAction })
              }
            />
          )}
        />
      ),
    });
  }, [navigation]);

  // Handles action from modal's left button
  function leftButtonHandler() {
    navigation.navigate('Home');
  }

  /**
   * Action to be performed by the ListItem's trash button
   * @param name Name of the item to be deleted
   */
  function trashButtonAction(name: string) {
    navigation.navigate('MessageModal', {
      title: translate('attention'),
      message: translate('deleteItemBody'),
      leftButtonLable: translate('capitalCancel'),
      rightButtonLable: translate('capitalYes'),
      leftButtonHandler,
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
          <ListItem
            item={item}
            trashButtonAction={trashButtonAction}
            navigateTo="TableItems"
          />
        )}>
        <Toast visible={visibleToast} message={translate('drawerDeleted')} />
      </ListContainer>
    </View>
  );
};

export default Home;
