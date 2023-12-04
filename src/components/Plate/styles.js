import styled from "styled-components/native"
import Colors from "../../styles/Colors"

export const Container = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: .9
}))`
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #000;
  border-style: solid;
  border-radius: 5px;
  overflow: hidden;
`;

export const Header = styled.View`
  width: 100%;
  background: #141FDB;
  padding: 5px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.View`
  width: 100%;
  background: #fff;
  padding: 10px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Flag = styled.Image.attrs((props) => ({
  resizeMode: 'contain',
}))`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  background: #fff;
`;

export const Br = styled.View`
  position: absolute;
  left: 5px;
  bottom: 3px;
`;