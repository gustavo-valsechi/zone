import React from "react";
import { Container, Action } from "./styles"
import LoadingBar from "../../LoadingBar"
import Icon from "../../Icon"
import Text from "../../Text"

export default function Checkbox(props) {
  return (
    <Container>
      {!!props.loading
      ? <LoadingBar circle={25} />
      : <Action checked={props.value} disabled={!!props.disabled} onPress={() => !props.disabled && props.onChangeText(!props.value)}>
          <Icon icon="check" size={14} color={!!props.disabled && !props.value ? "black-0" : "white"} />
        </Action>}
      {!!props.label && 
        <Text color="secondary" ml={10} weight={500} lines={5} flex={1} {...props.label}>
          {props.label?.text || props.label}
        </Text>}
    </Container>
  )
}
