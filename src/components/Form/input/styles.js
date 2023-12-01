import styled from 'styled-components/native';
import {Colors} from "../../../styles";

export const ContainerInput = styled.View`
  display: ${props => props.hidden ? 'none' : 'flex'};
  height: ${props => props.label 
    ? props.error || props.message?.show
      ? props.multiline ? '135px' : props.error && props.message?.show ? '90px' : '80px' 
      : props.multiline ? '125px' : '70px' 
    : props.error || props.message?.show
      ? props.multiline ? '110px' : props.error && props.message?.show ? '65px' : '55px' 
      : props.multiline ? '100px' : '45px'
  };
  margin-bottom: ${props => props.label ? '10px' : '0'};
  width: 100%;
`;

export const ContentInput = styled.View`
  position: relative;
  border-radius: 10px;
  background: ${props => !!props.disabled ? Colors['black-05'] : Colors[props.color || 'white']};
  border: ${props => props.error ? '.7px #FF334E !important' : `.7px ${Colors[props.borderColor || 'black-2']} !important`};
  height: ${props => props.multiline ? '100px' : '45px'};
  align-items: center;
  justify-content: ${props => props.multiline ? 'flex-start' : 'center'};
  width: 100%;
`;

export const Input = styled.TextInput`
  background-color: transparent;
  padding: ${props => props.icon || props.error ? '8px 50px 8px 18px' : props.multiline ? '10px 18px' : '8px 18px'};
  height: ${props => props.multiline ? '100px' : '45px'};
  font-size: 13px;
  border-radius: 10px;
  width: 100%;
  text-align-vertical: ${props => props.multiline ? 'top' : 'center'};
  color: ${props => Colors[props.textColor || 'secondary']};
`;

export const Error = styled.Text`
  color: #FF334E;
  font-size: 11px;
`;

export const Message = styled.Text`
  color: ${Colors.green};
  font-size: 12px
`;

export const InputIcon = styled.TouchableOpacity`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 10px;
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.iconExists ? 0 : 1};
`;

export const Link = styled.Text`
  color: ${props => !!props.disabled ? 'rgba(0, 0, 0, 0.5)' : '#4B3CA7'};
  font-size: 11px;
`;

export const Loading = styled.ActivityIndicator`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 10px;
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.iconExists ? 0 : 1};
`;
