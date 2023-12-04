import React from "react"
import { Avatar, Card, Icon, Text } from "../../../components"
import { Container, ContainerContent, ContainerLogo, Content } from "./styles"
import { Refactoring } from "../../../utils"
import _ from "lodash"

export default function EstablishmentCard(props) {
  return (
    <Card padding="15px" margin="0 0 10px" onPress={() => props.details(props.uuid)}>
      <Container>
        <ContainerLogo>
          <Avatar icon="store" source={props.photo} />
        </ContainerLogo>
        <ContainerContent>
          <Content flex={.75} >
            <Text bold color="secondary" lines={5}>{props.name}</Text>
            <Text color="black-4" size={11} lines={5}>{Refactoring.format.address(props.address)}</Text>
          </Content>
          <Content flex={.25} align="flex-end">
            <Text bold color="black-4" size={12} lines={5} align="right">
              <Icon pack="material" icon="location-on" size={12} color="black-4" />{" "}
              {!props.denied ? `${props.distance} km` : props.address?.state}
            </Text>
            <Text bold color="blue" size={12} lines={5} align="right">{props.percentItem || "0.00"} %</Text>
          </Content>
        </ContainerContent>
      </Container>
    </Card>
  )
}
