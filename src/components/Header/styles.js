import styled from "styled-components/native"
import {Colors} from "../../styles"

export const Container = styled.View`
  flex-direction: row;
  padding: 20px 25px;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: ${props => props.color || Colors.primary};
`;

export const ContainerTitle = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ContainerPress = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
  justify-content: center;
  flex: 0.5;
  ${props => props.flex && "align-items: center;"}
  flex-direction: ${props => props.flex || "column"};
  margin-right: ${props => props.mr || 0}px;
`;