import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import Search from '~/components/Search';
import db from '~/database/db';
import { RootStackParamList } from '~/types/types';

type SearchTableNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SearchTable'
>;

type Props = {
  navigation: SearchTableNavigationProp;
};

const SearchTable: React.FC<Props> = ({ navigation }) => {
  return <Search navigation={navigation} queryFunction={db.selectTable} />;
};

export default SearchTable;
