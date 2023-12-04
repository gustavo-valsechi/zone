import React from "react"
import { Icon, Plate } from "../../../../components"
import { AddPlateButton } from "./styles"
import { View } from "react-native"

export default function PlateCard(props) {

  const details = () => props.navigation.navigate("PlateDetails", { plate: props.plate })

  return (
    !!props.plate
    ? <View style={{ marginBottom: 10 }}>
        <Plate onPress={details} {...props} />
      </View>
    : <AddPlateButton onPress={() => props.modal.set(true)}>
        <Icon pack="fontAwesome5" size={15} icon="plus" color="black-2" />
      </AddPlateButton>
  )
}
