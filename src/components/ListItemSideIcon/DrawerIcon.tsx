import React from 'react';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Icon } from './styles';

const DrawerIcon: React.FC = () => {
  return (
    <Icon>
      <MCIIcon name="file-cabinet" size={32} color="#000" />
    </Icon>
  );
};

export default DrawerIcon;
