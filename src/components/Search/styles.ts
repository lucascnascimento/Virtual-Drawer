import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Icon = styled(TouchableOpacity)`
  padding-left: 10px;
  padding-right: 0px;
  margin-right: 0px;
`;
