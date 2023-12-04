import React from "react"
import {Container, ContainerIcon} from "./styles"
import Form from "../Form"
import Icon from "../Icon"

import ModalFilter from "./Modal"

export default function Filter(props) {
  return (
    <Container {...props}>
      <Form
        inputs={[{name: "search", placeholder: "Pesquise aqui...", ...props.search}]}
        margin="0px"
      />
      {props.modal && props.modal?.enabled !== false && (
        <>
          <ContainerIcon onPress={props.modal?.onToggle}>
            <Icon icon="filter-variant" size={25} color="primary" />
          </ContainerIcon>
          <ModalFilter
            isVisible={props.modal?.visible}
            onClose={props.modal?.onToggle}
            onClear={props.modal?.onClear}
            location={props.modal?.location}
            {...props}
          />
        </>
      )}
    </Container>
  )
}
