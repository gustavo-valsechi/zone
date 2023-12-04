import React from "react"
import DatePicker from "react-native-date-picker"
import Modal from "../../../Modal"
import Collapse from "../../../Collapse"
import { Container } from "./styles"
import Colors from "../../../../styles/Colors"

export default function ModalPeriod(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onClose}
      title={props.mode === "datetime" ? "Data e hora" : "Período"}
      buttons={[
        {
          label: "confirmar",
          analytics: { enabled: false },
          onPress: () => {
            props.onClose()
            props.onChangeText({
              start: props.start,
              end: props.end
            })
          }
        },
        {
          label: "resetar",
          onPress: props.onClear,
          hide: !props.onClear,
          analytics: { enabled: false },
        },
        {
          color: "black-0",
          label: { text: "fechar", color: "primary" },
          analytics: { enabled: false },
          onPress: props.onClose
        }
      ]}
    >
      <Container>
        <Collapse mb={10} header={{ icon: "calendar-day", title: "Início" }}>
          <DatePicker date={props.start} onDateChange={props.setStart} textColor={Colors["primary"]} mode={props.mode || "date"} />
        </Collapse>
        <Collapse header={{ icon: "calendar-week", title: "Final" }}>
          <DatePicker date={props.end} onDateChange={props.setEnd} textColor={Colors["primary"]} mode={props.mode || "date"} />
        </Collapse>
      </Container>
    </Modal>
  )
}
