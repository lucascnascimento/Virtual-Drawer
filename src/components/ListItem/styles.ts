import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 20px;
  justify-content: flex-start;
  background-color: #fff;
  align-items: center;
`;

export const Icon = styled.View``;

export const Body = styled.View``;

export const BodyTitle = styled.Text`
  font-size: 22px;
  padding-left: 20px;
`;

export const TrashButton = styled.TouchableOpacity`
  background: #f00;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
`;
