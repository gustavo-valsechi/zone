import React from "react"
import { Container, Pressable } from "./styles"
import LoadingBar from "../LoadingBar"
import Icon from "../Icon"
import Text from "../Text"

export default function Tabs(props) {
  return (
    <Container>
      {props.loading
      ? <LoadingBar white ml={10} height={40} width={80} />
      : props.content.map((data, index) => !data.hide &&
          <Pressable key={index} onPress={() => props.setTab(data.name)} current={props.tab === data.name}>
            {!!data.icon && <Icon pack="fontAwesome5" size={15} mr={10} icon={data.icon} color={props.tab === data.name ? "primary" : props.color || "white"} />}
            <Text color={props.tab === data.name ? "primary" : props.color || "white"} bold={!!Number(data.label)}>{data.label}</Text>
          </Pressable> 
        )}
    </Container>
  )
}
