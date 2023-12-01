import styled from 'styled-components/native';
import {Colors} from "../../../styles";

export const ContainerForm = styled.View`
  background: ${props => props.color || Colors.white};
  flex: 1;
  padding: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: space-between;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`

`;

export const Support = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
