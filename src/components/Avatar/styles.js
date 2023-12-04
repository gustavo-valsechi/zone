import styled from "styled-components/native"
import { Colors } from "../../styles"
import _ from "lodash"

export const Container = styled.View`
  width: ${props => props.width || props.size || 40}px;
  height: ${props => props.height || props.size || 40}px;
  border-radius: 200px;
  background: ${props => 
    (props.source && (_.includes(props.source, "http") || _.includes(props.source, "file"))) 
    || props.loading 
    || props.group
      ? "transparent" 
      : props.white 
        ? "rgba(255, 255, 255, 0.15)" 
        : Colors["black-15"]
  };
  align-items: center;
  justify-content: center;
  ${props => props.custom}
`;

export const Photo = styled.Image.attrs((props) => ({
  source: { uri: props.source }
}))`
  width: ${props => props.width || props.size || 40}px;
  height: ${props => props.height || props.size || 40}px;
  border-radius: 200px;
  border-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.2);
  ${props => props.custom}
`;

export const Group = styled.View`
  width: ${props => props.width || props.size || 40}px;
  height: ${props => props.height || props.size || 40}px;
  position: relative;
  width: 65px;
  height: 65px;
`;

export const GroupPlus = styled.View`
  position: absolute;
  top: 0;
  left: 60px;
`;