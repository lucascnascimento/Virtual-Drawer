import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from '~/types/types';

export const TopBar = styled.View`
  align-items: flex-start;
  background-color: #000;
  z-index: 2;
`;

export const FlashButtonContainer = styled.View`
  padding: 0px 12px;
  justify-content: center;
  background-color: transparent;
`;

export const FlashButton = styled(TouchableOpacity)<TouchableOpacityProps>`
  padding: 8px;
  background-color: transparent;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 104px;
  background-color: #000;
`;

export const CaptureButtonWrapper = styled.View`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 40px;
  padding: 4px;
`;

export const CaptureButton = styled(TouchableOpacity)<TouchableOpacityProps>`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  background-color: #ccc;
`;

export const PreviewButtonContainer = styled.View`
  flex-direction: row;
  background-color: #000;
  justify-content: space-evenly;
`;

export const CloseButton = styled(TouchableOpacity)<TouchableOpacityProps>`
  padding: 16px;
`;

export const CheckButton = styled(TouchableOpacity)<TouchableOpacityProps>`
  padding: 16px;
`;
