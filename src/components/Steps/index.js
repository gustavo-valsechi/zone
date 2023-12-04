import React from "react"
import { View } from "react-native"
import { Container, StepContainer, Line, Step, Label } from "./styles"
import Icon from "@expo/vector-icons/FontAwesome5"

export default function Steps(props) {

  const setColorStep = (index) => {
    if (props.currentStep - 1 === index) return "#4B3CA7"

    if (props.currentStep - 1 > index) return "#299f5d"

    return "rgba(0, 0, 0, 0.3)"
  }

  const setLineStep = (index) => {
    if (props.currentStep - 2 === index) return "#299f5d"

    if (props.currentStep - 2 > index) return "#299f5d"

    return "rgba(0, 0, 0, 0.3)"
  }

  return (
    <Container>
      {props.steps?.map((step, index) =>
        <View key={index} style={{flexDirection: "row", alignItems: "center", position: "relative", width: "28.3%"}}>
          {(props.steps?.length - 1) !== index && <Line color={setLineStep(index)} />}
          <StepContainer>
            <Step color={setColorStep(index)}>
              <Icon name={step.icon} color={setColorStep(index)} size={13} />
            </Step>
            <Label color={setColorStep(index)}>
              {step.label}
            </Label>
          </StepContainer>
        </View>
      )}
    </Container>
  )
}