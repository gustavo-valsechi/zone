import React from "react"
import { Container, Header, Body, Br, Flag } from "./styles"
import Input from "../Form/input"
import Text from "../Text"

export default function Plate(props) {
  return (
    <Container {...props}>
      <Header>
        <Text bold size={10} color="white">BRASIL</Text>
        {/* <Flag source={require("../../assets/start.jpg")} /> */}
      </Header>
      <Body>
        {!!props.input
        ? <Input plate {...props.input} />
        : <Text bold uppercase size={20} color="black">{props.plate}</Text>}
        <Br><Text bold size={10} color="black">BR</Text></Br>
      </Body>
    </Container>
  )
}