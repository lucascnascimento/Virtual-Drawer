import React from 'react';
import Search from '~/components/Search';
import db from '~/database/db';
import { SearchTableProps } from '~/types/types';

/**
 * Container for search tables
 */
const SearchTable: React.FC<SearchTableProps> = () => {
  return (
    <Search
      queryFunction={db.selectTable}
      deleteItem={db.dropTable}
      parent="SearchTable"
      navigateToOnItemPress="TableItems"
    />
  );
};

export default SearchTable;
