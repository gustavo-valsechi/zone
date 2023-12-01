import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerLogo = styled.View`
  flex: .15;
  align-items: center;
  justify-content: center;
`;

export const ContainerContent = styled.View`
  flex: .85;
  margin-left: 13px;
  flex-direction: row;
`;

export const Content = styled.View`
  justify-content: space-between;
  align-items: ${props => props.align || "flex-start"};
  flex: ${props => props.flex};
`;