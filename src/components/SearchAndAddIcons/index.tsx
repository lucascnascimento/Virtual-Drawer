import React, { useState } from 'react';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';
import MIIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import InputModal from '~/components/InputModal';

import { Container, SearchButton, AddButton } from './styles';

const SearchAndAddIcons: React.FC = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Container>
        {modalVisible && (
          <InputModal
            visible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        <SearchButton>
          <SLIIcon
            onPress={() => navigation.navigate('SearchTable')}
            name="magnifier"
            size={24}
            color="#000"
          />
        </SearchButton>

        <AddButton onPress={() => setModalVisible(true)}>
          <MIIcons name="plus" size={32} color="#000" />
        </AddButton>
      </Container>
    </>
  );
};

export default SearchAndAddIcons;
