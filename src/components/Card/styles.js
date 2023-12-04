import styled from "styled-components/native"
import Colors from "../../styles/colors"

export const Container = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: props.active || .9
}))`
  width: ${props => props.width || "100%"};
  padding: ${props => props.p || "20px"};
  margin: ${props => props.m || "0px"};
  background: ${props => Colors[props.background || "white"]};
  border-radius: ${props => props.br || "10px"};
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

export const ContainerUser = styled.View`
  flex-direction: row;
  flex: ${props => props.row ? 0.7 : "none"};
`;

export const ContainerLabel = styled.View`
  margin-left: 15px;
  justify-content: center;
  max-width: 160px;
`;