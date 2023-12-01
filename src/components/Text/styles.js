import styled from 'styled-components/native'
import Colors from '../../styles/Colors'

export const Text = styled.Text.attrs(props => ({
  numberOfLines: props.lines || 1
}))`
  flex: ${props => props.flex || 'none'};
  color: ${props => Colors[props.color || 'white']};
  font-weight: ${props => props.bold ? 'bold' : props.weight || 'normal'};
  /* text-transform: ${props => props.transform || 'none'}; */
  text-align: ${props => props.align || 'left'};
  font-size: ${props => props.size || '13'}px;
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-decoration: ${props => props.scratched ? 'line-through' : 'none'};
  ${props => props.width && `width: ${props.width}`};
  ${props => props.custom}
`;