import { BaseRouter, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import ListContainer from '~/components/ListContainer';

import db from '~/database/db';

// Toda hora que eu foco aqui ela recarrega

const Home = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  console.log(isFocused);

  useEffect(() => {
    console.log(`Retorno${route.params.render}`);
  }, [route.params.render]);

  return (
    <View accessibilityLabel="home screen">
      {isFocused && (
        <ListContainer
          getListItems={db.indexTables}
          deleteItem={db.dropTable}
          navigation={navigation}
          parentScreen="Home"
          toDelete={route.params.item}
        />
      )}
    </View>
  );
};

export default Home;
