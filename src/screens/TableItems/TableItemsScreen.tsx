import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import db from '~/database/db';
import translate from '~/translations';

import AddButton from '~/components/AddButton';
import HeaderRightIcons from '~/components/HeaderRightIcons';
import SearchButton from '~/components/SearchButton';

import { Item, TableItemsProps } from '~/types/types';
import ListContainer from '~/components/ListContainer';
import Toast from '~/components/Toast';
import ListItem from '~/components/ListItem';

const TableItemsScreen: React.FC<TableItemsProps> = (
  props: TableItemsProps,
) => {
  const { route } = props;

  const [itemsList, setItemsList] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Load table items on focus
  useFocusEffect(
    useCallback(() => {
      async function loadTableRows() {
        const res = await db.selectAllRows(route.params.tableName);
        const { rows } = res;
        const itemsArray: Item[] = [];
        rows.raw().forEach((item) => {
          itemsArray.push({
            id: item.id,
            name: item.name,
            description: item.description,
            location: item.location,
            pictureSrc: item.picture_src,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          });
        });
        setItemsList(itemsArray);
        setLoading(false);
      }
      loadTableRows();
    }, [route.params.tableName]),
  );

  /**
   * Set the right header icons and defines action for handling the add table function
   */
  useLayoutEffect(() => {
    /**
     * Create a database table on InputModal add action
     * @param inputText Database table name
     */
    async function handleAddAction(inputText: string) {
      console.info(`AddItem tableName: ${route.params.tableName}`);
      navigation.navigate('AddItem', {
        pictureSrcFolder: route.params.tableName,
      });
    }

    navigation.setOptions({
      title: route.params.tableName,
      headerRight: () => (
        <HeaderRightIcons
          leftSideButton={() => (
            <SearchButton
              searchButtonAction={() => navigation.navigate('SearchItemScreen')}
            />
          )}
          rightSideButton={() => (
            <AddButton addButtonAction={handleAddAction} />
          )}
        />
      ),
    });
  }, [navigation, route.params.tableName]);

  return (
    <View accessibilityLabel="TableItems screen">
      <ListContainer
        loading={loading}
        list={itemsList}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            trashButtonAction={() => {
              console.log('trash button');
            }}
            navigateTo="TableItems"
          />
        )}>
        <Toast visible={false} message={translate('drawerDeleted')} />
      </ListContainer>
    </View>
  );
};

export default TableItemsScreen;
