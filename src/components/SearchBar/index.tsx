import React, { useCallback, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';
import debounce from 'lodash.debounce';
import translate from '~/translations';

import { Container } from './styles';

type SearchBarProps = {
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * Search Bar component
 * @param setSearchField Function to set the input text value to the parent state
 */
const SearchBar: React.FC<SearchBarProps> = ({
  setSearchField,
}: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handler = useCallback(
    debounce(() => {
      setSearchField(value);
    }, 250),
    [value],
  );

  useEffect(() => {
    handler();
  }, [handler, value]);

  return (
    <Container>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={translate('searchForAnItem')}
      />

      {!value && (
        <SLIIcon name="magnifier" size={20} color="rgba(0,0,0,0.32)" />
      )}
    </Container>
  );
};

export default SearchBar;
