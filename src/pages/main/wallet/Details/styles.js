import styled from 'styled-components/native'
import { Colors } from '../../../../styles'

export const ContainerWalletHeader = styled.View`
  padding: 0 25px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerCompanyContent = styled.View`
  flex: 1;
  padding-right: 25px;
`;

export const ContainerCompanyPhoto = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: props.active || .95
}))``;

export const ContainerWalletLegend = styled.View`
  background: ${Colors['tertiary']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 25px 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Legend = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.View`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size}px;
  background: ${props => Colors[props.color]};
  margin-right: 5px;
`;

export const ContainerWalletTransactions = styled.View`
  background: ${Colors['white']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex: 1;
  padding: 25px 0 0;
  margin-top: -20px;
`;
