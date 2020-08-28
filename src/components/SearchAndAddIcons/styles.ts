import { GestureResponderEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface TouchableOpacityProps {
  onPress: (event: GestureResponderEvent) => void | undefined;
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 10px;
`;

export const SearchButton = styled(TouchableOpacity)<TouchableOpacityProps>`
  padding-right: 5px;
`;

export const AddButton = styled(TouchableOpacity)<TouchableOpacityProps>`
  padding-left: 5px;
`;
