import React, { useEffect, useState } from "react"
import { Container, Header, Title, Body } from "./styles"
import Text from "../Text"
import Icon from "../Icon"

export default function Collapse(props) {

  const [show, setShow] = useState(!!props.reverse)

  useEffect(() => {
    if (!!props.disabled) setShow(false)
  }, [props.disabled])

  return (
    <Container {...props}>
      <Header error={props.error} onPress={() => !props.disabled && setShow(!show)} show={show}>
        <Title>
          {!!props.header?.icon && 
            <Icon 
              pack={props.header?.icon?.pack || "fontAwesome5"} 
              mr={10} 
              color={!!props.disabled ? "black-4" : "primary"}
              size={props.header?.icon?.size || 13} 
              icon={props.header?.icon?.name || props.header?.icon} 
              {...props.header?.icon}
            />
          }
          <Text bold color={!!props.disabled ? "black-4" : "primary"}>{props.header?.title || props.title}</Text>
        </Title>
        <Icon color={!!props.disabled ? "black-4" : "primary"} size={23} icon={show ? "chevron-down" : "chevron-up"} />
      </Header>
      {show && 
        <Body p={props.body?.padding}>
          {props.children}
        </Body>}
    </Container>
  )
}