import React, { useState } from 'react';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';
import MIIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import InputModal from '~/components/InputModal';

import { Container, Button } from './styles';

const SearchAndAddIcons: React.FC = () => {
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
        <Button>
          <SLIIcon name="magnifier" size={24} color="#000" />
        </Button>
        <Button onPress={() => setModalVisible(true)}>
          <MIIcons name="plus" size={32} color="#000" />
        </Button>
      </Container>
    </>
  );
};

export default SearchAndAddIcons;
