import React from "react"
import { Container } from "./styles"
import Button from "../Form/button"
import Text from "../Text"
import Icon from "../Icon"

export default function Empty(props) {
  return (
    <Container {...props}>
      <Icon
        pack={props.icon?.pack || "fontAwesome5"}
        size={props.icon?.size || 50}
        icon={props.icon?.name || props.icon}
        color={props.icon?.color || "primary"}
        mb={20}
      />
      <Text align="center" lines={5} mb={10} color="primary" size={14} weight={500}>
        {props.message}
      </Text>
      {!!props.button && !props.button.hide && <Button {...props.button} />}
    </Container>
  )
}
