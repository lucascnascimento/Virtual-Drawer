import React from 'react';
import Search from '~/components/Search';
import db from '~/database/db';
import { SearchTableProps } from '~/types/types';

const SearchTable: React.FC<SearchTableProps> = () => {
  return <Search queryFunction={db.selectTable} deleteItem={db.dropTable} />;
};

export default SearchTable;
