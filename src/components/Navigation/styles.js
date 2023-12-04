import styled from "styled-components/native"
import { Colors } from "../../styles";

export const Container = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 15, paddingRight: 25 },
  horizontal: true
})`
  padding: 20px 0 0;
`;

export const Pressable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  width: 90px;
  height: 90px;
  background: ${props => !!props.disabled ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.15)"};
  border-radius: 15px;
  margin-left: 10px;
  padding: 10px;
  justify-content: space-between;
  position: relative;
`;

export const Soon = styled.View`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 3px 6px 3px 8px;
  background: ${Colors["white"]};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;