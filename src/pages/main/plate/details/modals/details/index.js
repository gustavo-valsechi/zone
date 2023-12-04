import React from "react"
import { Container, ContainerContent, ContainerMap, Content } from "./styles"
import { Button, Map, Modal, Text } from "../../../../../../components"
import { Refactoring } from "../../../../../../utils"
import moment from "moment"
import _ from "lodash"

export default function ModalDetails(props) {

  const content = props.content || {}

  const onClose = () => {
    props.toggle.set(false)
  }

  const isExpired = () => {
    const expiration = moment(content.dhOperation, "YYYY-MM-DD HH:mm")
      .add(content.time?.hour || 0, "hour")
      .add(content.time?.minute || 0, "minute")

    return expiration.diff(moment(), "minute") < 0
  }

  const details = [
    { "Valor": Refactoring.format.money(true, content.value) },
    { "Data da operação": Refactoring.format.datetime(content.dhOperation) },
    { 
      "Data de expiração": moment(content.dhOperation, "YYYY-MM-DD HH:mm")
        .add(content.time?.hour || 0, "hour")
        .add(content.time?.minute || 0, "minute") 
        .format("DD/MM/YYYY HH:mm")
    },
  ]

  return (
    <Modal
      isVisible={props.toggle.value}
      onBackdropPress={onClose}
      padding="0"
    >
      <Container>
        <ContainerMap>
          <Map markers={[{ coords: { latitude: -28.6783, longitude: -49.3704 }}]} />
        </ContainerMap>
        <ContainerContent>
          <Text bold size={16} color="secondary">Detalhes</Text>
          <Content color={isExpired() ? "danger" : "lightgreen"}>
            <Text bold size={12} color={isExpired() ? "danger" : "lightgreen"}>
              {isExpired() ? "Prazo esgotado" : "Ativo"}
            </Text>
          </Content>
          <Content>
            {_.map(details, (data, index) =>
              <Text key={index} size={12} color="secondary">
                {Object.keys(data)?.[0]}: <Text bold size={12} color="secondary">{Object.values(data)?.[0]}</Text>
              </Text>
            )}
          </Content>
          <Button 
            label="fechar"
            onPress={() => props.toggle.set(false)}
            margin="30px 0 0"
          />
        </ContainerContent>
      </Container>
    </Modal>
  )
}