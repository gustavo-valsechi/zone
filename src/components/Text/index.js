import React from "react"
import { Text } from "./styles"

export default function GlobalText(props) {
  return (
    <Text {...props}>
      {props.children || ""}
    </Text>
  )
}