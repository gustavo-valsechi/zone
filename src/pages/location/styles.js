import styled from "styled-components/native"
import { Colors } from "../../styles"

export const ContainerLocation = styled.View`
  background: ${Colors["white"]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  flex: 1;
`;

export const ContainerMap = styled.View`
  background: ${Colors["tertiary"]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  width: 100%;
  height: ${(props) => props.denied ? "170px" : "260px"};
  position: relative;
`;

export const ContainerAlert = styled.View`
  align-items: center;
  justify-content: center;
  padding: 25px;
`;

export const ContainerContent = styled.View`
  background: ${Colors["white"]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  flex: 1;
  padding: 25px 0 0;
  margin-top: -60px;
`;