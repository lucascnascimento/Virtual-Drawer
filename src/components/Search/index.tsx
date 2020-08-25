import React, { useState } from 'react';
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '~/components/SearchBar';
import ListContainer from '~/components/ListContainer';

import { Header, Icon } from './styles';

const Search = ({ queryFunction, navigation }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <Header>
        <Icon onPress={() => navigation.goBack()}>
          <MCIIcons name="arrow-left" size={32} color="rgba(0,0,0,0.32)" />
        </Icon>
        <SearchBar setSearchField={setSearchValue} />
      </Header>

      <ListContainer getListItems={queryFunction} searchParam={searchValue} />
    </>
  );
};

export default Search;
