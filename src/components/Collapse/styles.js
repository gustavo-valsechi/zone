import styled from "styled-components/native"
import Colors from "../../styles/colors"

export const Container = styled.View`
  border: .7px ${props => Colors[props.error ? "danger" : "black-2"]};
  border-radius: 15px;
  flex: ${props => props.flex || "none"};
  margin-right: ${props => props.mr || "0"}px;
  margin-left: ${props => props.ml || "0"}px;
  margin-top: ${props => props.mt || "0"}px;
  margin-bottom: ${props => props.mb || "0"}px;
  ${props => props.width && `width: ${props.width}`};
  ${props => props.custom}
`;

export const Header = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  padding: 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: ${props => props.show ? ".7px" : "0px"}; 
  border-bottom-color: ${props => Colors[props.error ? "danger" : "black-2"]};
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Body = styled.View`
  padding: ${props => props.p || "15px"};
`;