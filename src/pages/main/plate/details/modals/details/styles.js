import styled from 'styled-components/native'
import { Colors } from '../../../../../../styles'

export const Container = styled.View`

`;

export const ContainerMap = styled.View`
  background: ${Colors["tertiary"]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  width: 100%;
  height: ${(props) => props.denied ? "170px" : "260px"};
  position: relative;
`;

export const ContainerContent = styled.View`
  background: ${Colors["white"]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  flex: 1;
  padding: 20px 25px;
  margin-top: -60px;
`;

export const Content = styled.View`
  border: .7px ${props => Colors[props.color] || "#cccccc"};
  border-radius: 5px;
  width: 100%;
  padding: 10px 15px;
  margin-top: 10px;
`;