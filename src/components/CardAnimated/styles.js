import styled from "styled-components/native"
import Colors from "../../styles/Colors"
import Animated from "react-native-reanimated"

export const Container = styled(Animated.View)`
  position: relative;
  overflow: hidden;
`;

export const ContainerCard = styled.View`
  width: ${props => props.width || "100%"};
  padding: ${props => props.p || (props.indicator ? "20px 20px 20px 28px" : "20px")};
  margin: ${props => props.m || "0px"};
  background: ${props => props.background || Colors["white"]};
  border-radius: 15px;
  position: relative;
  border: ${props => props.border || ".7px #cccccc"};
  overflow: hidden;

  ${props => props.row && `
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}

  ${props => props.center && `
    justify-content: center;
    align-items: center;
  `}
`;

export const Indicator = styled.View`
  position: absolute;
  left: 0;
  width: 8px;
  height: 100%;
  background: ${props => Colors[props.color || "black-15"]};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const ContainerUser = styled.View`
  flex-direction: row;
  flex: ${props => props.row ? 0.7 : "none"};
  align-items: center;
`;

export const ContainerLabel = styled.View`
  margin-left: 15px;
  justify-content: center;
  align-items: center;
  max-width: 160px;
`;
