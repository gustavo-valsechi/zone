import styled from 'styled-components/native'
import { Colors } from '../../../styles'

export const ContainerProfile = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  background: ${Colors['white']};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 25px;
`;

export const ContainerPhoto = styled.TouchableOpacity.attrs({
  activeOpacity: .9
})`
  position: relative;
  margin: auto auto 5px;
`;

export const AlterPhoto = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${Colors["tertiary"]};
  border-radius: 20px;
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;