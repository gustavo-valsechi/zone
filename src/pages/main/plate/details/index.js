import React, { useState } from "react"
import { Container, InfiniteScroll } from "../../../../components"
import { ContainerPlateTransactions } from "./styles"
import _ from "lodash"

import Card from "./card"

import ModalAdd from "./modals/add"
import ModalDetails from "./modals/details"

export default function PlateDetails({ route, navigation }) {

  const [params] = useState(route.params || {})
  const [modalAdd, setModalAdd] = useState(false)
  const [modalDetails, setModalDetails] = useState(false)
  const [details, setDetails] = useState({})
  const [content, setContent] = useState([
    {
      dhOperation: "2023-12-03 21:33",
      time: { hour: 2, minute: 0 },
      value: 4
    },
    {
      dhOperation: "2023-11-30 13:40",
      time: { hour: 1, minute: 30 },
      value: 3
    }
  ])

  const loadingPlateDetails = false
  const fetchingMorePlateDetails = false
  const reloadPlateDetails = false

  const plateDetails = {
    content
  }

  return (
    <Container
      header={{
        title: params.plate,
        left: {
          function: navigation.goBack,
          icon: "chevron-left"
        },
        right: {
          function: () => setModalAdd(true),
          icon: "plus"
        }
      }}
    >
      <ModalAdd 
        toggle={{ value: modalAdd, set: setModalAdd }}
        content={{ value: content, set: setContent }}
      />
      <ModalDetails
        toggle={{ value: modalDetails, set: setModalDetails }}
        content={details}
      />
      <ContainerPlateTransactions>
        <InfiniteScroll 
          content={{ data: plateDetails.content, loading: loadingPlateDetails }}
          fetch={{ function: () => {}, loading: fetchingMorePlateDetails }}
          refresh={{ function: () => {}, loading: reloadPlateDetails }}
          empty={{ icon: "file-invoice-dollar", message: "Nenhum registro encontrado" }}
          item={{ component: (item) => 
            <Card 
              modal={{ value: modalDetails, set: setModalDetails }} 
              details={{ value: details, set: setDetails }} 
              {...item} 
            /> 
          }}
        />
      </ContainerPlateTransactions>
    </Container>
  )
}
