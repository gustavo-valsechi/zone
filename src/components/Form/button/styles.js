import styled from "styled-components/native";
import Colors from "../../../styles/Colors"

export const Button = styled.TouchableOpacity`
  background-color: ${props => Colors[props.color || "primary"]};
  opacity: ${props => !!props.disabled ? 0.5 : 1};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || "15px 0"};
  border-radius: ${props => props.borderRadius || 50}px;
  margin: ${props => props.margin || "10px 0 0"};
  width: ${props => props.width || "100%"};
`;

export const Loading = styled.ActivityIndicator`
  margin-right: 10px;
`;