import React from "react"
import { Refactoring } from "../../utils"
import Text from "../Text"

export default function RescuePolicy(props) {

  const money = (value) => Refactoring.format.money(true, value)

  const rule = () => {
    const style = { size: 11, color: "primary", lines: 1, bold: true, ...props.style }

    const company = props.content || {}

    const minRescue = company.minRescue ? <> no mínimo <Text {...style}>{money(company.minRescue)}</Text> </> : undefined
    const maxRescue = company.maxRescue ? <> no máximo <Text {...style}>{money(company.maxRescue)}</Text> </> : undefined

    const RULE = {
      "PERCENTUAL": <>Você pode resgatar <Text {...style}>{Number(company.percentRescue).toFixed(2)}%</Text> do valor da compra</>,
      "ILIMITADO": <>Você pode resgatar seu <Text {...style}>saldo disponível</Text> a qualquer momento</>,
      "MIN-MAX": <>Você pode resgatar{minRescue && maxRescue ? <>{minRescue}e{maxRescue}</> : minRescue || maxRescue}</>
    }

    return RULE[company.typeRescue]
  }

  return rule()
}