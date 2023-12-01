import styled from 'styled-components/native'
import { Colors } from '../../styles'

export const ContainerProfile = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  background: ${Colors['white']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 100%;
`;

export const ContainerProfileHeader = styled.View`
  background: ${Colors['tertiary']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  padding: 20px 25px 40px;
  flex-direction: row;
  align-items: center;
`;

export const ContainerName = styled.View`
  margin-left: 25px;
`;

export const ContainerContent = styled.View`
  background: ${Colors['white']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 25px;
  flex: 1;
  margin-top: -20px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
`;

export const ContainerActions = styled.View`
  margin-top: 20px;
`;