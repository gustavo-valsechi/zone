import React from "react"
import Modal from "../../../Modal"
import { Container, Option, Text, ContainerOption } from "./styles"

export default function ModalOptions(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onClose}
      title={props.title}
    >
      <Container showsVerticalScrollIndicator={false}>
        {props.options?.map((item, index) =>
          <ContainerOption key={index} position_key={index}>
            <Option
              activeOpacity={0.8}
              onPress={() => {
                props.setOptionValue(item[Object.keys(item)])
                props.setOptionLabel(Object.keys(item)[0])
                props.onClose()
              }}
            >
              <Text>{Object.keys(item)[0]}</Text>
            </Option>
          </ContainerOption>
        )}
      </Container>
    </Modal>
  )
}
