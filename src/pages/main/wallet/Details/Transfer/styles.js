import styled from 'styled-components/native'
import { Colors } from '../../../../../styles'

export const ContainerAmount = styled.View`
  background: ${Colors['tertiary']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 25px 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ContainerTransfer = styled.View`
  background: ${Colors['white']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex: 1;
  padding-top: 25px;
  margin-top: -20px;
`;

export const Scroll = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 25, paddingBottom: 70 }
})`
  background: ${Colors['white']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex: 1;
`;

export const ContainerCustomer = styled.View`
  background: ${Colors['tertiary']};
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 20px;
  flex-direction: row;
`;

export const ContainerPhoto = styled.View`
  flex: .15;
  align-items: center;
  justify-content: center;
`;

export const ContainerContent = styled.View`
  flex: .85;
  margin-left: 20px;
  justify-content: center;
`;

export const Content = styled.View`
  margin-top: 5px;
`;