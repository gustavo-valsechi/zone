import styled from "styled-components/native"
import Colors from "../../styles/Colors"
import SafeAreaView from "react-native-safe-area-view";

export const ContainerNummus = styled.View`
  flex: 1;
  background: ${props => props.color || Colors["primary"]};
  position: relative;
`;

export const SafeArea = styled(SafeAreaView).attrs((props) => ({
    forceInset: {
        top: props.neverSafeAreaTop ? "never" : "always",
        bottom: "never"
    }
}))`
  flex: 1;
  background: ${Colors["primary"]};
`;

export const StatusBarNummus = styled.StatusBar.attrs({
    barStyle: "light-content"
})``;
