import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import ListContainer from '~/components/ListContainer';

import db from '~/database/db';

const Home = () => {
  return (
    <View accessibilityLabel="home screen">
      <ListContainer getListItems={db.indexTables} deleteItem={db.dropTable} />
    </View>
  );
};

export default Home;

// todo: criar um botão para adicionar tabelas e listar as tabelas
