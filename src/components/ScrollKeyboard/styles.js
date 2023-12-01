import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Container = styled(KeyboardAwareScrollView).attrs({
  scrollEnabled: true,
  enableOnAndroid: false,
  showsVerticalScrollIndicator: false
})``;
