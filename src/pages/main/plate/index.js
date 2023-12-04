import React, { useState } from "react"
import { InfiniteScroll } from "../../../components"

import Filters from "./filters"
import Card from "./card"
import ModalPlate from "./modal"

export default function Plate(props) {

  const [content, setContent] = useState([{ plate: "QQK9H97" }])
  const [modal, setModal] = useState(false)

  const loadingPlate = false
  const fetchingMorePlate = false
  const reloadPlate = false

  const plate = { 
    total: 0,
    totalPage: 0,
    content 
  }

  return (
    <>
      <ModalPlate 
        toggle={{ value: modal, set: setModal }}
        content={{ value: content, set: setContent }}
      />
      {props.expanded && <Filters disabled={loadingPlate && !fetchingMorePlate && !reloadPlate} />}
      <InfiniteScroll 
        content={{ data: [...plate.content, {}], loading: loadingPlate }}
        fetch={{ function: () => {}, loading: fetchingMorePlate }}
        refresh={{ function: () => {}, loading: reloadPlate }}
        empty={{ enabled: false }}
        item={{ component: (item) => 
          <Card 
            modal={{ value: modal, set: setModal }} 
            navigation={props.navigation} 
            {...item} 
          /> 
        }}
      />
    </>
  )
}
