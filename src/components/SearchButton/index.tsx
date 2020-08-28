import React from 'react';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';

import { Search } from './styles';

type SearchButtonProps = {
  searchButtonAction: () => void;
};

const SearchButton: React.FC<SearchButtonProps> = (props) => {
  const { searchButtonAction } = props;

  return (
    <Search onPress={searchButtonAction}>
      <SLIIcon name="magnifier" size={24} color="#000" />
    </Search>
  );
};

export default SearchButton;
