import React from "react"
import { Container, ContainerUser, ContainerLabel } from "./styles"
import { Refactoring } from "../../utils"
import Text from "../Text"
import Avatar from "../Avatar"

export default function GlobalCard(props) {

  const mask = (type, value) => Refactoring.mask[type](value)

  return (
    <Container p={props.padding} m={props.margin} br={props.borderRadius} {...props}>
      {props.customer &&
        <ContainerUser>
          <Avatar source={props.customer.photo || props.customer.photo_url || props.customer.foto_url} />
          <ContainerLabel>
            <Text scratched={props.customer.scratched} color="secondary" flex={1} bold>{props.customer.name || "Cadastro rápido"}</Text>
            <Text scratched={props.customer.scratched}  color="secondary">{mask("phone", props.customer.phone) || mask("docNumber", props.customer.document_number) || props.customer.email || props.customer.code || "Sem código"}</Text>
          </ContainerLabel>
        </ContainerUser>}
      {props.children}
    </Container>
  )
}
