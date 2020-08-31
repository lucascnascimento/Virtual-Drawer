import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Text } from 'react-native';
import db from '~/database/db';

import AddButton from '~/components/AddButton';
import HeaderRightIcons from '~/components/HeaderRightIcons';
import SearchButton from '~/components/SearchButton';

import { TableItemsProps } from '~/types/types';

// import { Container } from './styles';

const TableItems: React.FC<TableItemsProps> = (props: TableItemsProps) => {
  const { route } = props;

  const navigation = useNavigation();

  /**
   * Set the right header icons and defines action for handling the add table function
   */
  useLayoutEffect(() => {
    /**
     * Create a database table on InputModal add action
     * @param inputText Database table name
     */
    async function handleAddAction(inputText: string) {
      console.log('handle Add Action');
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
            <AddButton addButtonAction={handleAddAction} />
          )}
        />
      ),
    });
  }, [navigation]);

  return <Text>Drawer Items: {route.params.tableName}</Text>;
};

export default TableItems;
