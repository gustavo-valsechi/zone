import React, { useEffect, useState } from "react"
import { Container, Input } from "./styles"
import { Refactoring } from "../../../utils"
import Text from "../../Text"
import moment from "moment";
import "moment/locale/pt-br"

import ModalPeriod from "./Modal"

export default function InputPeriod(props) {

  const [modal, setModal] = useState(false)

  const [start, setStart] = useState(moment(new Date()).toDate())
  const [end, setEnd] = useState(moment(new Date()).add(10, "minute").toDate())

  useEffect(() => {
    if (!props.value) {
      setStart(moment(new Date()).toDate())
      setEnd(moment(new Date()).add(10, "minute").toDate())
      return
    }

    setStart(moment(props.value.start).toDate())
    setEnd(moment(props.value.end).toDate())
  }, [props.value])

  const format = (type, value) => Refactoring.format[type](value)

  return (
    <Container error={start > end} {...props}>
      {!!props.label && <Text color="secondary" bold mb={5}>{props.label}</Text>}
      <Input onPress={() => setModal(true)} error={start > end} {...props}>
        <ModalPeriod
          isVisible={modal}
          onClose={() => setModal(false)}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          {...props}
        />
        <Text color={props.color || "secondary"} bold={props.bold}>
          {format("date", start) === "Data inválida"
          ? props.mode === "datetime" ? "selecione a data e hora" : "selecione a data"
          : `${format(props.mode || "date", start)} - ${format(props.mode || "date", end)}`}
        </Text>
      </Input>
      {start > end && <Text size={11} color="danger">Data inicial maior que a final</Text>}
    </Container>
  )
}
