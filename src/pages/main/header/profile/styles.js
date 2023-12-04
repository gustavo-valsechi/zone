import styled from "styled-components/native"

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 20px;
`;

export const ContainerUser = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  flex-direction: row;
  flex: 1;
`;

export const ContainerLabel = styled.View`
  margin-left: 15px;
  justify-content: center;
  flex: 0.7;
`;

export const ContainerName = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const ContainerIcons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80px;
`;

export const Pressable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 30px;
  height: 30px;
`;
