import styled from "styled-components/native"

export const Container = styled.View`
  height: ${props => props.label ? props.error ? "80px" : "70px" : props.error ? "55px" : "45px"};
  margin-bottom: ${props => props.label ? "10px" : "0"};
`;

export const Input = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8
}))`
  border-radius: 15px;
  color: ${({fontColor}) => fontColor || "rgba(0,0,0,0.2)"};
  background: ${({disabled, bg}) => disabled ? "#eee" : bg || "#fff"};
  border: ${props => props.error ? ".7px #FF334E !important" : `.7px ${props.bg || "rgba(0, 0, 0, 0.2)"} !important`};
  height: 45px;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 13px;
`;
