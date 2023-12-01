import React from "react"
import { Container, ContainerIcon, ContainerMessage } from "./styles"
import Text from "../Text"
import Icon from "../Icon"
import Button from "../Form/button"
import { StatusBar } from "expo-status-bar"

export default function BlockSystem(props) {
  return (
    <Container>
      <StatusBar translucent />
      <ContainerIcon>
        <Icon
          pack={props.icon?.pack || 'material'}
          size={props.icon?.size || 80}
          icon={props.icon?.name || props.icon || 'block'}
          color={props.icon?.color || 'white'}
        />
      </ContainerIcon>
      <ContainerMessage>
        <Text align='center' lines={20} mb={30} color='primary' bold size={14}>{props.title}</Text>
        <Text align='center' lines={20} mb={30} color='secondary' size={13} weight={500}>{props.message}</Text>
        {!!props.button && !props.button.hide && <Button {...props.button} />}
      </ContainerMessage>
    </Container>
  )
}
