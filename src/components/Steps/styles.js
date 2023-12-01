import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const StepContainer = styled.View`
  position: relative;
  align-items: center;
  background: #fff;
`;

export const Line = styled.View`
  height: 2px;
  width: 100%;
  background: ${(props) => props.color};
  position: absolute;
`;

export const Step = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid;
  border-color: ${(props) => props.color};
`;

export const Label = styled.Text`
  font-size: 12px;
  color: ${(props) => props.color};
  position: absolute;
  top: 55px;
  text-align: center;
  min-width: 70px;
`;