import styled from "styled-components/native"

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${props => props.p || "30px 25px"};
  margin-right: ${props => props.mr || "0"}px;
  margin-left: ${props => props.ml || "0"}px;
  margin-top: ${props => props.mt || "40"}px;
  margin-bottom: ${props => props.mb || "0"}px;
`;