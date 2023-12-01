import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { Colors } from '../../../../../styles'

export const Container = styled.View`
  margin-left: 12.5px;
  padding-left: 20px;
  position: relative;
  border-left-width: 5px;
  border-left-color: ${props => Colors[props.last ? "white-0" : "tertiary"]};
  min-height: 40px;
`;

export const Status = styled.View`
  background: ${Colors["tertiary"]};
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  position: absolute;
  top: 0;
  left: -17.5px;
`;

export const Circle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: ${props => Colors[props.color]};
  align-items: center;
  justify-content: center;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

export const Content = styled.View`
  margin: 10px 0;
`;

