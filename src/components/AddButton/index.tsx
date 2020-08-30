import React from 'react';
import MIIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Add } from './styles';

type AddButtonProps = {
  addButtonAction: () => void;
};

/**
 * Renders an add button
 * @param addButtonAction Action to be performed by the button
 */
const AddButton: React.FC<AddButtonProps> = (props: AddButtonProps) => {
  const { addButtonAction } = props;

  return (
    <Add onPress={addButtonAction}>
      <MIIcons name="plus" size={32} color="#000" />
    </Add>
  );
};

export default AddButton;
