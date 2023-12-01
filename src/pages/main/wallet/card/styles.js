import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { Colors } from '../../../../styles'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerLogo = styled.View`
  flex: .25;
  align-items: ${props => props.group ? "flex-start" : "center"};
  justify-content: center;
`;

export const ContainerContent = styled.View`
  flex: .75;
  margin-left: 13px;
`;

export const Content = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

export const ContainerRule = styled.View`
  flex: .65;
`;

export const ContainerAmount = styled.View`
  flex: .35;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ContainerCoupon = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;