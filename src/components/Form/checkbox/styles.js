import styled from 'styled-components/native'
import Colors from '../../../styles/Colors'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Action = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  border: .7px rgba(0, 0, 0, 0.5);
  background: ${props => Colors[props.checked 
    ? !!props.disabled ? 'black-1' : 'primary' 
    : !!props.disabled ? 'black-1' : 'white'
  ]};
  justify-content: center;
  align-items: center;
`;