import styled from "styled-components/native"
import Colors from "../../styles/Colors"
import Animated from "react-native-reanimated"

export const ContainerPlate = styled(Animated.View)`
  background: ${Colors["white"]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  position: absolute;
  z-index: 999;
`;

export const ContainerHandler = styled(Animated.View)`
  
`;

export const ContainerTitle = styled.TouchableOpacity.attrs({
  activeOpacity: .9
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
`;
