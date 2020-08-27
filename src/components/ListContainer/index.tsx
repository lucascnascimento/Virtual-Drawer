import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import translate from '~/translations';

import { Separator } from './styles';

import { TableName } from '~/types/types';
import Toast from '../Toast';

type ListContainerProps = {
  list: Array<TableName>;
  loading: boolean;
  renderItem: ({ item }: { item: TableName }) => JSX.Element;
};

const ListContainer: React.FC<ListContainerProps> = (
  props: ListContainerProps,
) => {
  const { list, loading, renderItem } = props;

  const [visibleToast, setVisibleToast] = useState(false);

  useEffect(() => {
    setVisibleToast(false);
  }, [visibleToast]);

  return (
    <View testID="ListContainer">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(listItem) => listItem.name}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Separator />}
        />
      )}

      <Toast visible={visibleToast} message={translate('drawerDeleted')} />
    </View>
  );
};

export default ListContainer;
