import styled from "styled-components/native"

export const Container = styled.ScrollView`
  width: 100%;
  max-height: 260px;
  border-radius: 15px;
  border: 0.7px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

export const ContainerOption = styled.View`
  border-top-width: 0.7px;
  border-top-color: ${props => props.position_key === 0 ? "rgba(0, 0, 0, 0.0)" : "rgba(0, 0, 0, 0.1)"};
`;

export const Option = styled.TouchableOpacity`
  flex: 1;
  padding: 8px;
`;

export const Text = styled.Text`
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;