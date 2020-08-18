import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import ListContainer from '~/components/ListContainer';

import db from '~/database/db';

import { TableName } from '~/types/types';

const Home = () => {
  const [tables, setTables] = useState<Array<TableName>>([]);

  useEffect(() => {
    async function getTables() {
      const res = await db.indexTables();
      const { rows } = res;
      const itemArray: TableName[] = [];
      for (let i = 1; i < rows.length; i++) {
        itemArray.push(rows.item(i));
      }
      setTables(itemArray);
    }

    getTables();
  }, []);

  return (
    <View accessibilityLabel="home screen">
      <ListContainer tables={tables} />
    </View>
  );
};

export default Home;

// todo: criar um botão para adicionar tabelas e listar as tabelas
