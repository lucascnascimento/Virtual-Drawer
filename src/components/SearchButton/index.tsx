import React from 'react';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';

import { Search } from './styles';

type SearchButtonProps = {
  searchButtonAction: () => void;
};

/**
 * Renders a search button
 * @param searchButtonAction Action to be performed by the button
 */
const SearchButton: React.FC<SearchButtonProps> = (
  props: SearchButtonProps,
) => {
  const { searchButtonAction } = props;

  return (
    <Search onPress={searchButtonAction}>
      <SLIIcon name="magnifier" size={24} color="#000" />
    </Search>
  );
};

export default SearchButton;
