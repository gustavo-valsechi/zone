import styled from 'styled-components/native';
import { Form } from '@unform/mobile';

export const FormNummus = styled(Form)`
  flex: 1;
`;

export const ContainerInput = styled.View`
  margin: ${props => props.m || '0 0 15px'};
  flex-direction: ${props => props.flexRow ? 'row' : 'column'};
`;
