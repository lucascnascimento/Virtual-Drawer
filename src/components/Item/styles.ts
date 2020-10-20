import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  margin: 0px 8px;
`;

export const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
`;

export const ImgContainer = styled.View`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border-color: #ccc;
  border-width: 2px;
  background-color: #ccc;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

export const CameraButton = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

export const TrashButton = styled.View`
  position: absolute;
  top: 16px;
  right: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const Form = styled.View``;

export const TxtInput = styled(TextInput)`
  margin: 4px 0px;
`;
