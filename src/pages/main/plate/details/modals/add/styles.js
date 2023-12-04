import styled from 'styled-components/native'

export const Container = styled.View`

`;

export const ContainerContent = styled.View`
  border: .7px #cccccc;
  border-radius: 5px;
  width: 100%;
  padding: 10px 15px;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Content = styled.View`

`;

export const ContainerQuantity = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 15px;
`;

export const Pressable = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: props.active || .9
}))`
  padding: 5px;
`;