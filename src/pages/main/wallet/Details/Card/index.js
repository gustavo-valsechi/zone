import React from 'react'
import { Card, Icon, Text } from '../../../../../components'
import { Container, Status, Circle, ContainerTitle, Content } from './styles'
import { Refactoring } from '../../../../../utils'
import _ from 'lodash'

const TYPE = {
  "PRESENTE": { icon: "gift", label: "Presente" },
  "BONUS": { icon: "dollar-sign", label: "Bônus" },
  "TRANSFERENCIA": { icon: "random", label: "Transferência" },
  "TRANSFERIDO": { icon: "random", label: "Transferido" },
}

export default function WalletCard(props) {

  const money = (value) => Refactoring.format.money(true, value)
  const date = (value) => Refactoring.format.date(value)

  const status = () => {
    if (props.tipo_cashback === "TRANSFERENCIA" || props.tipo_cashback === "TRANSFERIDO") return "primary"
    if (props.cancelado) return "danger"
    if (props.resgatado) return "green"
    if (props.vencido) return "yellow"

    return "black-2"
  }

  const content = () => {
    const type = props.tipo_cashback

    if (type === "TRANSFERENCIA") return <>
      <Text color="black-6" size={12}>
        De: <Text bold color="secondary" size={12}>{props.cliente_origem_transferencia}</Text>
      </Text>
    </>

    if (type === "TRANSFERIDO") return <>
      <Text color="black-6" size={12}>
        Para: <Text bold color="secondary" size={12}>{props.cliente_destino_transferencia}</Text>
      </Text>
    </>

    if (type === "NORMAL") return <>
      <Text color="black-6" size={12}>
        Pago: <Text bold color="secondary" size={12}>{money(props.valor_pago || "0.00")}</Text>
      </Text>
      {Number(props.valor_cupom) > 0 &&
        <Text color="black-6" size={12}>
          Cupom: <Text bold color="secondary" size={12}>{money(props.valor_cupom || "0.00")}</Text>
        </Text>}
      {Number(props.valor_resgate) > 0 &&
        <Text color="black-6" size={12}>
          Resgate: <Text bold color="secondary" size={12}>{money(props.valor_resgate || "0.00")}</Text>
        </Text>}
    </>
  }
  
  return (
    <Card padding="0" border="0" borderRadius="0">
      <Container last={props.last}>
        <Status>
          <Circle color={status()}>
            <Icon pack="fontAwesome5" size={10} icon={TYPE[props.tipo_cashback]?.icon || "dollar-sign"} />
          </Circle>
        </Status>
        <ContainerTitle>
          <Text weight={500} color="secondary">{TYPE[props.tipo_cashback]?.label || "Compra"}</Text>
          <Text color="black-4" size={10}>{date(props.created_at)}</Text>
        </ContainerTitle>
        <Content>
          {content()}
          <Text color="black-6" size={12}>
            Cashback: <Text bold color="blue" size={12}>{money(props.valor_transferencia || props.valor_cashback || "0.00")}</Text>
          </Text>
        </Content>
      </Container>
    </Card>
  )
}
