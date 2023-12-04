import styled from "styled-components/native"

export const Container = styled.View`
  height: ${props => props.label ? props.error ? "80px" : "70px" : props.error ? "55px" : "45px"};
  margin-bottom: ${props => props.label ? "10px" : "0"};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: ${props => props.label ? "0" : "20px"};
`;

export const Input = styled.TextInput`
  width: 24%;
  text-align: center;
  background-color: transparent;
  padding: ${props => props.icon || props.error ? "8px 50px 8px 20px" : "8px 20px"};
  font-size: 12.5px;
  border-radius: 15px;
  border: ${props => props.error ? ".7px #FF334E !important" : ".7px rgba(0, 0, 0, 0.2) !important"};
`;

export const InputHidden = styled.TextInput`
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;
`;

export const Error = styled.Text`
  color: #FF334E;
  font-size: 11px;
`;
