import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 10px;
`;

export const SearchButton = styled(TouchableOpacity)`
  padding-right: 5px;
`;

export const AddButton = styled(TouchableOpacity)`
  padding-left: 5px;
`;
