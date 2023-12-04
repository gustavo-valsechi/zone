import React, { useState } from "react"
import { Container, ContainerContent, ContainerQuantity, Content, Pressable } from "./styles"
import { Icon, Modal, Text } from "../../../../../../components"
import { Refactoring } from "../../../../../../utils"
import moment from "moment"
import _ from "lodash"

export default function ModalAdd(props) {

  const [content, setContent] = useState({ value: 0, hour: 0, minute: 0 })
  const [times, setTimes] = useState([
    { label: "1 hora", value: 2, quantity: 0 },
    { label: "30 minutos", value: 1, quantity: 0 },
  ])

  const onClose = () => {
    props.toggle.set(false)
    setContent({ value: 0, hour: 0, minute: 0 })
    setTimes([
      { label: "1 hora", value: 2, quantity: 0 },
      { label: "30 minutos", value: 1, quantity: 0 },
    ])
  }

  const onSubmit = () => {
    const expiration = moment().add(content.hour, "hour").add(content.minute * 30, "minute")

    const hour = expiration.diff(moment(), "hour")

    const minutes = _.round((content.minute * 30) / 60, 1)

    let minute = 0

    if (_.includes(String(minutes), ".")) minute = 30

    const newContent = [{ 
      dhOperation: moment().format("YYYY-MM-DD HH:mm"),
      time: { hour, minute }
    }, ...props.content.value]

    props.content.set(newContent)

    onClose()
  }

  const quantity = (method, data, index) => {
    let timesContent = [...times]

    const newValue = {
      ...data,
      quantity: method === "ADD" 
        ? data.quantity + 1 
        : data.quantity ? data.quantity - 1 : 0
    }

    if (Number(index) === 0) timesContent = [newValue, timesContent[1]]
    if (Number(index) === 1) timesContent = [timesContent[0], newValue]

    setTimes(timesContent)

    setContent({ 
      value: _.sumBy(timesContent, (content) => content.value * content.quantity),
      hour: timesContent[0].quantity,
      minute: timesContent[1].quantity,
    })
  }

  return (
    <Modal
      isVisible={props.toggle.value}
      onBackdropPress={onClose}
      title="Adicionar tempo"
      buttons={[
        { label: "confirmar", onPress: onSubmit },
        { label: { text: "cancelar", color: "secondary" }, color: "black-0", onPress: onClose },
      ]}
    >
      <Container>
        {_.map(times, (data, index) => 
          <ContainerContent key={index}>
            <Content>
              <Text bold size={12} color="primary">{data.label}</Text>
              <Text size={12} color="black-4">{Refactoring.format.money(true, data.value)}</Text>
            </Content>
            <ContainerQuantity>
              <Pressable onPress={() => quantity("REMOVE", data, index)}>
                <Icon pack="fontAwesome5" icon="minus" size={14} color="secondary" />
              </Pressable>
              <Text bold size={14} color="primary">{String(data.quantity)}</Text>
              <Pressable onPress={() => quantity("ADD", data, index)}>
                <Icon pack="fontAwesome5" icon="plus" size={14} color="secondary" />
              </Pressable>
            </ContainerQuantity>
          </ContainerContent>
        )}
        <ContainerContent>
          <Text size={14} color="secondary">Total</Text>
          <Text bold size={14} color="primary">{Refactoring.format.money(true, content.value)}</Text>
        </ContainerContent>
      </Container>
    </Modal>
  )
}