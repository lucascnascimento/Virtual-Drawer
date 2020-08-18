import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Button = styled(TouchableOpacity)`
  padding: 0 4px;
`;
