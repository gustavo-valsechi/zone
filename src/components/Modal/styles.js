import styled from 'styled-components/native'

import Modal from 'react-native-modal';
import { Dimensions, ScrollView } from 'react-native';

const MIN_WIDTH = Dimensions.get("window").width;
const MIN_HEIGHT = Dimensions.get("window").height;

export const GlobalModal = styled(Modal).attrs({
  deviceWidth: MIN_WIDTH,
  deviceHeight: MIN_HEIGHT,
  avoidKeyboard: true,
  backdropTransitionOutTiming: 0,
  backdropOpacity: .4
})`
  justify-content: flex-end;
  margin: 0;
  z-index: 99;
`;

export const Container = styled.View`
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px 25px 0px 25px;
  max-height: ${MIN_HEIGHT - 150}px;
`;

export const Scroll = styled.ScrollView.attrs((props) => ({
  keyboardDismissMode: 'none',
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'never',
  scrollEnabled: !props.enabled
}))``;

export const Title = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  margin: 10px 0 30px;
`;
