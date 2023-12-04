import styled from "styled-components/native"

export const Container = styled.View`
  padding: 25px 0;
  z-index: ${props => props.zIndex || "100"};
`;

export const ContainerAmount = styled.View`
  padding: 0 25px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Amount = styled.View`
  flex: 1;
`;
