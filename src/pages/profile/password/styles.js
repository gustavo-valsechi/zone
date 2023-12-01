import styled from 'styled-components/native'
import { Colors } from '../../../styles'

export const ContainerPassword = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  background: ${Colors['white']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 25px;
`;