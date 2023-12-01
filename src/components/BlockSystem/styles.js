import styled from 'styled-components/native'
import { Colors } from '../../styles';

export const Container = styled.View`
  background: ${Colors['primary']};
  flex: 1;
`;

export const ContainerIcon = styled.View`
  align-items: center;
  justify-content: center;
  padding: 30px 25px;
  flex: 0.3;
`;

export const ContainerMessage = styled.View`
  align-items: center;
  padding: 30px 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: ${Colors['white']};
  flex: 0.7;
`;