import styled from "styled-components/native"

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.p || "0 25px"};
  margin-bottom: 15px;
`;

export const ContainerIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  margin-left: 5px;
  border: .7px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
`;
