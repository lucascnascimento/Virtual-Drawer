import React, { useCallback, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';
import debounce from 'lodash.debounce';
import translate from '~/translations';

import { Container } from './styles';

type SearchBarProps = {
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Search Bar component
 * @param setSearchField Function to send the TextInput value to the parent's state
 * @param setLoading State setter to display a Loading animation indicating the
 * search is being perfromed
 */
const SearchBar: React.FC<SearchBarProps> = ({
  setSearchField,
  setLoading,
}: SearchBarProps) => {
  const [value, setValue] = useState('');

  /**
   * Debounce the setting of the TextInput to parent
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = useCallback(
    debounce(() => {
      setSearchField(value);
    }, 250),
    [value],
  );

  // Execute the debounce and set's the loading to the parent component
  useEffect(() => {
    handler();
    if (setLoading) setLoading(true);
  }, [handler, setLoading, value]);

  return (
    <Container>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={translate('searchForAnItem')}
        autoFocus
      />

      {!value && (
        <SLIIcon name="magnifier" size={20} color="rgba(0,0,0,0.32)" />
      )}
    </Container>
  );
};

export default SearchBar;
