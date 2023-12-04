import styled from "styled-components/native"
import Colors from "../../styles/colors"
import Animated from "react-native-reanimated"

const arrow_position = (position, color) => {
  const position_content = {
    top: `
      top: -10px;
      border-right-width: 8px;
      border-right-color: transparent;
      border-bottom-width: 10px;
      border-bottom-color: ${color || "#454e61"};
      border-left-width: 8px;
      border-left-color: transparent;
      border-top-width: 0;
      border-top-color: transparent;
    `,
    bottom: `
      bottom: -10px;
      border-right-width: 8px;
      border-right-color: transparent;
      border-top-width: 10px;
      border-top-color: ${color || "#454e61"};
      border-left-width: 8px;
      border-left-color: transparent;
      border-bottom-width: 0;
      border-bottom-color: transparent;
    `,
    left: `
      left: -10px;
      border-bottom-width: 8px;
      border-bottom-color: transparent;
      border-right-width: 10px;
      border-right-color: ${color || "#454e61"};
      border-top-width: 8px;
      border-top-color: transparent;
      border-left-width: 0;
      border-left-color: transparent;
    `,
    right: `
      right: -10px;
      border-bottom-width: 8px;
      border-bottom-color: transparent;
      border-left-width: 10px;
      border-left-color: ${color || "#454e61"};
      border-top-width: 8px;
      border-top-color: transparent;
      border-right-width: 0;
      border-right-color: transparent;
    `,
  }

  return position_content[position]
}

export const Container = styled(Animated.View)`
  padding: ${props => props.m || "0px"};
`;

export const Content = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  background: ${props => Colors[props.color] || "#454e61"};
  border-radius: 15px;
  position: relative;
  padding: ${props => props.p || "15px 25px"};
`;

export const Arrow = styled.View`
  width: 0;
  height: 0;
  background: transparent;
  position: absolute; 
  border-style: solid;

  ${props => arrow_position(props.arrow?.position || "top", Colors[props.color])}
  ${props => props.arrow?.top && `top: ${props.arrow?.top}`};
  ${props => props.arrow?.bottom && `bottom: ${props.arrow?.bottom}`};
  ${props => props.arrow?.left && `left: ${props.arrow?.left}`};
  ${props => props.arrow?.right && `right: ${props.arrow?.right}`};
`;