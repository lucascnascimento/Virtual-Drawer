import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  margin: 20px;
  padding: 35px;
  border-radius: 20px;
  background: white;
`;

export const Header = styled.View`
  padding-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 16px;
`;

export const Body = styled.View`
  padding: 12px 0px;
`;

export const Footer = styled.View`
  padding-top: 12px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity`
  padding: 0px 4px;
  color: #2196f3;
`;
