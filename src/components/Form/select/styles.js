import styled from 'styled-components/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Colors} from "../../../styles";

export const Container = styled.View`
  align-items: center;
  height: ${props => props.labelOut ? props.error ? '80px' : '70px' : props.error ? '55px' : '45px'};
  margin-bottom: ${props => props.labelOut ? '10px' : '0'};
`;

export const ContainerSelect = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 15px;
  border-radius: 10px;
  border: 0.7px ${props => props.error ? '#FF334E' : Colors[props.borderColor || 'black-2']};
  background: ${props => props.disabled ? Colors['black-05'] : Colors[props.color || 'white']};
  position: relative;
  height: 45px;
  justify-content: center;
`;

export const Input = styled.View`
  width: 95%;
  padding: 8px 50px 8px 8px;
  font-size: 12.5px;
  position: absolute;
  bottom: 0;
  left: 12px;
  height: 45px;
  justify-content: center;
`;

export const InputHidden = styled.TextInput.attrs({
  focused: false,
  editable: false
})`
  display: none;
`;

export const IconSelect = styled(FontAwesome)`
  color: ${props => Colors[props.textColor || 'secondary']};
  font-size: 15px;
  position: absolute;
  right: 12px;
`;

export const Error = styled.Text`
  color: #FF334E;
  font-size: 11px;
  width: 100%;
`;
