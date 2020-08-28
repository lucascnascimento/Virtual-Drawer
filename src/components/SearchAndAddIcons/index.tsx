import React from 'react';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';
import MIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { Container, SearchButton, AddButton } from './styles';

type SearchAndAddIconsProps = {
  handleAddAction: (inputText: string) => Promise<void>;
};

const SearchAndAddIcons: React.FC<SearchAndAddIconsProps> = ({
  handleAddAction,
}: SearchAndAddIconsProps) => {
  const navigation = useNavigation();

  return (
    <>
      <Container>
        <SearchButton>
          <SLIIcon
            onPress={() => navigation.navigate('SearchTable')}
            name="magnifier"
            size={24}
            color="#000"
          />
        </SearchButton>

        <AddButton
          onPress={() =>
            navigation.navigate('InputModal', { handleAddAction })
          }>
          <MIIcons name="plus" size={32} color="#000" />
        </AddButton>
      </Container>
    </>
  );
};

export default SearchAndAddIcons;
