import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import ListContainer from '~/components/ListContainer';

import db from '~/database/db';

const Home = () => {
  const isFocused = useIsFocused();
  console.log(isFocused);
  return (
    <View accessibilityLabel="home screen">
      {isFocused && (
        <ListContainer
          getListItems={db.indexTables}
          deleteItem={db.dropTable}
        />
      )}
    </View>
  );
};

export default Home;
