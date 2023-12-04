import styled from "styled-components/native"
import { Animated } from "react-native"
import { Colors } from "../../../../../styles"

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border-top-width: .7px;
  border-right-width: .7px;
  border-bottom-width: .7px;
  border-left-width: 5px;
  border-left-color: ${(props) => Colors[!props.isExpired ? "lightgreen" : "danger"]};
  border-top-color: #cccccc;
  border-right-color: #cccccc;
  border-bottom-color: #cccccc;
  padding: 10px 15px;
  width: 100%;
  margin-bottom: 10px;
`;

export const Content = styled.View`

`;

export const Time = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: 3px 5px;
  border-radius: 5px;
  background-color: ${Colors["tertiary"]};
`;

