import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ResultSet } from 'react-native-sqlite-storage';
import translate from '~/translations';

import { Separator } from './styles';

import ListItem from '~/components/ListItem';
import MessageModal from '~/components/MessageModal';

import { TableName } from '~/types/types';
import Toast from '../Toast';

type ListContainerProps = {
  getListItems: (searchParam?: string) => Promise<ResultSet>;
  deleteItem: (name: string) => Promise<ResultSet>;
  searchParam?: string;
};

const ListContainer = ({
  getListItems,
  deleteItem,
  searchParam,
}: ListContainerProps): JSX.Element => {
  const [list, setList] = useState<Array<TableName>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState('');
  const [visibleToast, setVisibleToast] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getList() {
      setLoading(true);
      const res = searchParam
        ? await getListItems(searchParam)
        : await getListItems();
      const { rows } = res;
      const itemArray: TableName[] = [];
      for (let i = 0; i < rows.length; i++) {
        itemArray.push(rows.item(i));
      }
      setList(itemArray);
      setLoading(false);
    }

    getList();
  }, [getListItems, searchParam]);

  useEffect(() => {
    setVisibleToast(false);
  }, [visibleToast]);

  /**
   * Deletes an item from the list.
   * @param name Name of the item to be deleted from the list.
   */
  async function deleteFromList(name: string) {
    try {
      const res = await deleteItem(name);
      const newList = list.filter((item) => item.name !== name);
      setList(newList);
    } catch (error) {
      console.log(error);
    }
  }

  function openModal(name: string) {
    setModalVisible(true);
    setItemToBeDeleted(name);
  }

  async function confirmModalAction() {
    await deleteFromList(itemToBeDeleted);
    setModalVisible(false);
    setVisibleToast(true);
  }

  function cancelModalAction() {
    setModalVisible(false);
  }

  return (
    <View testID="ListContainer">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(listItem) => listItem.name}
          renderItem={({ item }) => (
            <ListItem item={item} openConfirmationModal={openModal} />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      )}
      <MessageModal
        visible={modalVisible}
        title={translate('attention')}
        message={translate('deleteItemBody')}
        cancelText={translate('cancel')}
        confirmText={translate('yes')}
        cancelAction={cancelModalAction}
        confirmAction={confirmModalAction}
      />
      <Toast visible={visibleToast} message={translate('drawerDeleted')} />
    </View>
  );
};

export default ListContainer;
