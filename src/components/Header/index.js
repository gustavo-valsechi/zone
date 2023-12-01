import React from 'react'
import { Container, ContainerTitle, ContainerPress } from './styles'
import Icon from '../Icon'
import Text from '../Text'
import LoadingBar from '../LoadingBar'

export default function Header(props) {
  return (
    <Container color={props.color}>
      <ContainerPress onPress={() => !props.left?.disabled && props.left?.function()}>
        <Icon 
          pack={props.left?.icon?.pack} 
          icon={props.left?.icon?.name || props.left?.icon} 
          size={props.left?.icon?.size || 30} 
          color={props.left?.disabled ? 'white-2' : props.left?.icon?.color || 'white'} 
          {...props.left?.icon} 
        />
      </ContainerPress>
      <ContainerTitle>
        {!!props.title && (
          props.title?.loading
          ? <LoadingBar height={20} white />
          : <Text bold color="white" size={18} align="center" {...props.title}>
              {typeof props.title === 'object' ? props.title.text || "" : props.title || ""}
            </Text>
        )}
      </ContainerTitle>
      <ContainerPress onPress={() => !props.right?.disabled && props.right?.function()}>
        <Icon 
          pack={props.right?.icon?.pack} 
          icon={props.right?.icon?.name || props.right?.icon} 
          size={props.right?.icon?.size || 30} 
          color={props.right?.disabled ? 'white-2' : props.right?.icon?.color || 'white'} 
          align='right' 
          {...props.right?.icon}
        />
      </ContainerPress>
    </Container>
  )
}
