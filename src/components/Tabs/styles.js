import styled from 'styled-components/native'
import { Colors } from '../../styles';

export const Container = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 15, paddingRight: 25 },
  horizontal: true
})`
  flex: 0.1;
`;

export const Pressable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  height: 40px;
  background: ${props => props.current ? Colors['white'] : 'rgba(255, 255, 255, 0.15)'};
  border-radius: 10px;
  margin-left: 10px;
  padding: 0 15px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;