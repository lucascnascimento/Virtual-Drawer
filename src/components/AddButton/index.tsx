import React from 'react';
import MIIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Add } from './styles';

type AddButtonProps = {
  addButtonAction: () => void;
};

const AddButton: React.FC<AddButtonProps> = (props) => {
  const { addButtonAction } = props;

  return (
    <Add onPress={addButtonAction}>
      <MIIcons name="plus" size={32} color="#000" />
    </Add>
  );
};

export default AddButton;
