import React from "react"
import { Card, Text } from "../../../../../components"
import { Container, Content, Time } from "./styles"
import { Refactoring } from "../../../../../utils"
import moment from "moment"
import _ from "lodash"

export default function PlateCard(props) {

  const datetime = (value) => Refactoring.format.datetime(value)

  const isExpired = () => {
    const expiration = moment(props.dhOperation, "YYYY-MM-DD HH:mm")
      .add(props.time?.hour || 0, "hour")
      .add(props.time?.minute || 0, "minute")

    return expiration.diff(moment(), "minute") < 0
  }
  
  return (
    <Card 
      padding="0" 
      border="0" 
      borderRadius="0" 
      onPress={() => {
        props.modal.set(true)
        props.details.set(props)
      }}
    >
      <Container isExpired={isExpired()}>
        <Content>
          <Text bold size={12} color={isExpired() ? "danger" : "lightgreen"}>
            {isExpired() ? "Prazo esgotado" : "Ativo"}
          </Text>
          <Text size={10} color="black-3">{datetime(props.dhOperation)}</Text>
        </Content>
        <Time>
          <Text bold size={10} color="primary">
            {_.trim(`${props.time?.hour ? `${props.time?.hour}h` : ""} ${props.time?.minute ? `${props.time?.minute}min` : ""}`)}
          </Text>
        </Time>
      </Container>
    </Card>
  )
}
